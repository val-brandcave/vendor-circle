"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { OnboardingStepper } from "@/components/onboarding-stepper-new";
import { buildOnboardingSteps } from "@/lib/onboarding/step-builder";
import { isAuthenticated } from "@/lib/auth/auth-utils";

export default function UnifiedOnboardingPage() {
  const router = useRouter();
  
  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      // Not logged in, redirect to signup
      router.push('/signup');
    }
  }, [router]);

  const handleComplete = (data: Record<string, any>) => {
    console.log("Onboarding complete - Full data:", data);
    
    // Determine user type and account type
    const userType = data.userType; // 'individual' or 'business'
    const accountType = data.accountType; // 'individual_vendor' or 'business_admin'
    
    console.log("User type:", userType);
    console.log("Account type:", accountType);
    
    // Save onboarding data to localStorage
    if (userType === 'individual') {
      localStorage.setItem("vendorProfile", JSON.stringify(data));
      localStorage.setItem("onboardingComplete-vendor", "true");
      localStorage.setItem("just-completed-onboarding-vendor", "true"); // Flag for modal
      console.log("Set just-completed-onboarding-vendor flag");
    } else if (userType === 'business') {
      localStorage.setItem("businessProfile", JSON.stringify(data));
      localStorage.setItem("onboardingComplete-business", "true");
      localStorage.setItem("just-completed-onboarding-business", "true"); // Flag for modal
      console.log("Set just-completed-onboarding-business flag");
    }
    
    // CRITICAL FIX: Get current user ID from the auth token (not from localStorage)
    // This is the canonical source of truth
    let currentUserId: string | null = null;
    try {
      const token = localStorage.getItem('vendors_circle_auth_token');
      if (token) {
        const decoded = JSON.parse(atob(token));
        currentUserId = decoded.userId;
        console.log("Got user ID from token:", currentUserId);
      }
    } catch (error) {
      console.error("Error decoding auth token:", error);
    }
    
    if (!currentUserId) {
      console.error("Could not get user ID from token");
      return;
    }
    
    // Update the user in the vendors_circle_users array (canonical source)
    try {
      const usersData = localStorage.getItem('vendors_circle_users');
      if (usersData) {
        const users = JSON.parse(usersData);
        const userIndex = users.findIndex((u: any) => u.id === currentUserId);
        if (userIndex !== -1) {
          users[userIndex].hasCompletedOnboarding = true;
          users[userIndex].accountType = accountType;
          if (userType === 'business') {
            users[userIndex].ownerIsAppraiser = data.ownerIsAppraiser ?? false;
          }
          localStorage.setItem('vendors_circle_users', JSON.stringify(users));
          console.log("✅ Successfully updated user in vendors_circle_users array:", {
            userId: currentUserId,
            accountType: accountType,
            ownerIsAppraiser: userType === 'business' ? data.ownerIsAppraiser : undefined
          });
        } else {
          console.error("❌ User not found in vendors_circle_users array:", currentUserId);
        }
      } else {
        console.error("❌ vendors_circle_users not found in localStorage");
      }
    } catch (error) {
      console.error("❌ Error updating vendors_circle_users:", error);
    }
    
    // Route to UNIFIED dashboard (same for everyone)
    // Modal will appear on the dashboard
    console.log("Routing to /dashboard (unified)");
    router.push("/dashboard");
  };

  const handleSkip = () => {
    // Mark as skipped
    localStorage.setItem("onboardingSkipped", "true");
    
    // Still need to set account type if they selected one
    const storedData = localStorage.getItem('onboarding-progress-User Onboarding');
    if (storedData) {
      try {
        const progress = JSON.parse(storedData);
        if (progress.data?.userType) {
          const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
          user.accountType = progress.data.accountType || 'individual_vendor';
          localStorage.setItem('currentUser', JSON.stringify(user));
          
          // Route to unified dashboard
          router.push("/dashboard");
          return;
        }
      } catch {}
    }
    
    // Default to unified dashboard
    router.push("/dashboard");
  };

  return (
    <OnboardingStepper
      getSteps={buildOnboardingSteps}
      title="User Onboarding"
      onComplete={handleComplete}
      onSkip={handleSkip}
      showSkip={false}
      themeColor="blue"
      initialData={{ 
        userType: 'individual', 
        accountType: 'individual_vendor' 
      }}
    />
  );
}

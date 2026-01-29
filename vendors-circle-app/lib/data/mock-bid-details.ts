// Mock data for Bid Details Drawer - demonstrating complete structure

export const mockBidDetails = {
  id: "work-001",
  fileNumber: "FN9238",
  bankName: "Fifth Third Bank",
  bankLogo: "/logos/banks/32px-Fifth_Third_Bank_2023_logo-shieldonly-primary.svg.png",
  propertyAddress: "1200 Elm Street, Cincinnati, OH 45202",
  propertyType: "Commercial",
  status: "In Progress",
  dueDate: "2025-01-15",
  jobManagerName: "Val Vinnakota",
  vendorName: "Val Vinnakota",
  appraisalBidRequest: "https://example.com/bid-letter.pdf",
  desiredDeliveryDate: "2025-01-14",
  
  // General vendor documents (provided by bank)
  generalVendorDocs: [
    {
      id: "doc-1",
      name: "Vendor Help Guide",
      url: "/documents/vendor-help-guide.pdf",
      type: "pdf"
    },
    {
      id: "doc-2",
      name: "Fee Schedule",
      url: "/documents/fee-schedule.pdf",
      type: "pdf"
    }
  ],

  // Q&A conversation thread
  questions: [
    {
      id: "q-1",
      author: "Val Vinnakota",
      authorRole: "buyer",
      timestamp: "now",
      message: "ghhjj"
    },
    {
      id: "q-2",
      author: "Val Vinnakota",
      authorRole: "vendor",
      timestamp: "now",
      message: "ghhjnm"
    }
  ],

  // Required documents for completing the job
  requiredDocuments: [
    {
      id: "req-1",
      name: "pdf7.pdf",
      url: "/documents/survey.pdf",
      type: "pdf",
      uploadedDate: "01/27/2026 09:59 pm (Survey)"
    },
    {
      id: "req-2",
      name: "pdf6.pdf",
      url: "/documents/rent-roll.pdf",
      type: "pdf",
      uploadedDate: "01/27/2026 09:59 pm (Rent Roll)"
    },
    {
      id: "req-3",
      name: "pdf8.pdf",
      url: "/documents/legal-description.pdf",
      type: "pdf",
      uploadedDate: "01/27/2026 09:59 pm (Legal Description)"
    }
  ]
};

/**
 * Transform mockWorkItems into BidDetailsDrawer format
 * This function would be used when clicking a bid from the table
 */
export function transformWorkItemToBidDetails(workItem: any) {
  return {
    id: workItem.id,
    fileNumber: workItem.fileNumber,
    bankName: workItem.bankName,
    bankLogo: workItem.bankLogo,
    propertyAddress: workItem.propertyAddress,
    propertyType: "Commercial", // Would come from workItem or API
    status: workItem.stage,
    dueDate: workItem.dueDate,
    jobManagerName: "Val Vinnakota", // Would come from API
    vendorName: "Val Vinnakota", // Would come from API/auth
    appraisalBidRequest: workItem.externalFormUrl,
    desiredDeliveryDate: workItem.dueDate,
    generalVendorDocs: [
      {
        id: "doc-1",
        name: "Vendor Help Guide",
        url: "/documents/vendor-help-guide.pdf",
        type: "pdf"
      }
    ],
    questions: [], // Would be fetched from API
    requiredDocuments: [
      {
        id: "req-1",
        name: "Survey Document",
        url: "/documents/survey.pdf",
        type: "pdf",
        uploadedDate: "01/27/2026"
      }
    ]
  };
}

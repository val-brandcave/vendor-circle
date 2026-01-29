# Vendors Circle – Current State Walkthrough  
**Presenter:** Jason  
**Recording Date (from context):** December 2025  

---

## Transcript

**0:00**  
Just doing a quick general review of Circle in it's current state here. So Circle, again, is the vendor management tool that allows vendors to have a central spot to go to to manage their licenses, their profile, uhm, their coverage areas, all that good stuff, as well as have a single portal to go to

**0:19**  
for all the work that they have, all the requests that they have across all banks. So, uhm, this is the landing page.

**0:24**  
The landing page here, so we don't have a marketing landing page, the logo is just a generic logo that's there right now, so all this stuff is ripe for change.

**0:33**  
So once you're logged in, what it's going to look like is for a vendor that already exists, they're inside Circle already, is they're going to go to their My Request page and do their work.

**0:43**  
So this is where they're going to have work categorized by the type of work, so you see sections such as Bids Needed, Bids Submitted.

**0:48**  
Submitted all the way down to Bids Lost in the last 30 days. That's going to be broken down by bank, so every bank they're engaged with, they're going to see what work needs to be done for that bank.

**0:58**  
And when they click those links, it's going to then go out to a separate web form. We're not going to touch those during this process, but the separate web forms are already existing web forms that the banks have that are custom to each bank.

**1:10**  
We're going to leave those alone for the time being for this introduction. And I'm rollout and just have this be the piece that we're really focused on getting this out the door here.

**1:19**  
So my request, they're going to have all the tools they need to be able to manage their profile and interact with the banks from the spot.

**1:26**  
So for today's date, you're going to be able to edit their profile, add addresses, if they have multiple addresses, set what their general specialties are, another way other sections come in here shortly is that designations, their coverage areas.

**1:40**  
You notice that there's opportunities here to make this even better, which is what I want to do. We'll make this feel good when you're using it.

**1:46**  
Uh, so example of this is really overwhelming, right? So all that stuff's manageable here. Um, they can click and add coverage areas.

**1:53**  
And when they do, they will select or deselect all of what, what counties they work with within that state. They can always edit, they can remove them all the time.

**2:00**  
General, you know, CRUD, um, functionality of a normal CRUD app, right? So all that's available here, uh, when they'll have the ability to manage their licenses, their certifications, their, um, insurance all from one spot here.

**2:14**  
And this is important as the banks will consume this and import into their systems. Uh, they will have the ability to add state licenses for any state.

**2:24**  
Uh, upload, upload the certification license, enter license number, um, set their expiration dates. So all this is, is one spot for them to manage.

**2:34**  
Uh, they will also have the ability to see what banks have invited them. Right now, this vendor doesn't have any pending invites, uh, but if there were, they would get an email, they click it to go to this page and they can review the invite, accept or decline.

**2:48**  
And if they do, that will go back to the bank side. So this is the current, um, circle from the vendor perspective.

**2:55**  
There is an admin side. I don't see a heavy usage on the admin side. Um, see if I have one right now, CSO.

**3:02**  
On the admin side, they do have the ability to edit, um, those lists or the list of specialties. They'll be able to modify them here.

**3:09**  
Uh, they'll be able to do a general search for vendors. Um, this is an admin side. to work my click on it because I'm logged in as a regular user, but they'll be able to search and see the, a view of what that vendor profile looks like.

**3:21**  
And what that vendor profile looks like, I'll show you in a second here, but when I switch over, um, is also how the bank's going to see it.

**3:28**  
So if I were inside of a bank and I'm consuming that, what that central circle is site, I might be able to go to a new spot inside Uconnect called Uconnect Circle.

**3:40**  
And from here, I'll be able to do any sort of search I need to directly from that other external database using the API available there.

**3:47**  
So if I need to get, um, I'm going to click clear. And I want to do a search for everybody in the system.

**3:54**  
I'm going to see all 50,000 vendors are in the system. and say I want to see, okay, here's somebody that might fit our profile here.

**4:05**  
This Tom, I can click on that profile. And now it's pulling a view right from that circle. And this is what the admins can see in the admin side of the circle.

**4:13**  
You'll see that one centralized view with all the state licenses that they have, all the coverage areas. Um, this data profile is not filled out.

**4:19**  
Let's pick a different one here. Let's go, uh, let's go Jill. Cool. Oops.

**4:30**  
Junk character. I already, I already invited Jill, so that won't work. So let's do one of these default ones here.

**4:39**  
I might see, Let's go to invites. Eh. Skip this for now. Pending invites, so whatever. I want to see one that has good data inside of it for this test.

**4:52**  
Here we go. Let's do Zack. He just recently did this. Zack and accept data. Alright, sidetrack. Let's go back. Um, once I find a vendor that I do want to work with, I can go ahead and click.

**5:03**  
I have test data here, so I'm good to go. I can click this email icon. It's going to invite that vendor.

**5:08**  
This, this works if the vendor is already inside Circle. And this is going to show up for Jill in the invite list over here.

**5:15**  
So Jill will get an email and do a redirect here and accept that. Um, if the vendor does not exist yet, let's say they're not there at all, the, the person inside the bank can enter the name.

**5:25**  
So I can say, um, JasonTest. Send to, This is going to send a, um, email address. Email to that vendor.

**5:38**  
And when the vendor clicks it, they'll then go through the import process. Um, sorry, the process of creating a new account inside Circle, right?

**5:46**  
Um, other aspects to show here that are important, uh, as the vendor updates a, their profile or their licenses inside Circle and they're engaged with banks already, they are already connected with the I think those updates are.

**6:01**  
Are going to go to each bank they're engaged with. And when they do, they go, they go to this vendor updates section.

**6:07**  
In this vendor updates section, each bank will be able to review the change and accept or decline it. So as they go through, it's going to be very much of a, hey, um, this, this change here, we don't want inside of our bank.

**6:18**  
We, it's not useful to us. I'm gonna go ahead and ignore it. If I want to accept it, I hit the accept button and it pulls it right in.

**6:24**  
Right? So it's going to go down and bring it down to like inbox zero. I'm going to get this down to zero all the time.

**6:29**  
Um, if it, if it's a special field, like a state license, you're going to, they're going to see something a little bit different here.

**6:34**  
They're going to see more information. And instead of that accept, um, arrow, they're going to have a little eye icon.

**6:41**  
And when they click on it, they're going to get the ability to see what the license file is, click it, open it up.

**6:46**  
And then for every vendor type, so a vendor could, could have several different roles. It could be an appraiser, it could be a reviewer.

**6:52**  
They might have, um, a couple other, um, evaluation. It might be some other vendor types. And for each one of those, the vendor admin inside the bank will be able to approve or unapprove or just leave as pending.

**7:05**  
And that's going to go ahead and close it. When they accept that, it's going to make it disappear just like the normal process does here.

**7:11**  
And so there's that process there. Thank you. Um, I sent the invite out to that test user just a minute ago.

**7:17**  
That's going to show up in here. Um, right now the data is blank because I got to get the service running.

**7:22**  
Um, it runs on services behind the scenes. It's very much a, um, data message broker system. And event-driven architecture. So, waiting for that to run on this test environment.

**7:34**  
But once it is, it's going to show here if there are any errors. They'll be able to resend and that will go back out to that person.

**7:41**  
Um, once they're, uh, imported or declined, this will fall off that list. Um, let's say they have, uh, accepted. So we've got one here called Zach.

**7:52**  
He's accepted it. You're going to, he's going to have this little import vendor button. And I'm going to go ahead and click that.

**7:59**  
And what's going to happen here now is it's going to pull that profile on the right side, that's in circle.

**8:02**  
It's also going to default the data that Zach has entered. I don't think, where's Zach's information here? So we've got Zach's first name, last name, and email for his test code.

**8:13**  
He didn't fill any of this other information, so that's not there. Um, this stuff is going to auto-check, uh, if possible.

**8:21**  
I don't think designations will though. And all the licenses behind the scene are going to come across as well. So we're going to, so once I hit here, I hit the save button, it's going to create the vendor record inside of, um, the bank here.

**8:33**  
It's going to, uh, it's going to connect them with the circle one. So they'll now see this bank in their bank list.

**8:39**  
And it's going to pull up the licenses over automatically behind the scenes on that save process. So all licenses, all that, um, those PDFs and policy numbers, all that's going to come over to their record as well.

**8:49**  
So that automatically pulls in. So I'm going to stop this video here. I might start another video that's going to walk through the new user onboarding.

**8:57**  
There's, there's always potential to make that a little bit smoother. We want that process as clean as possible so that we're, that way there's no sticking points for the vendors lost and not knowing what to do next.

**9:06**  
We want to just get them to the next step of getting that profile filled out, the license filled out and, and on their way.

**9:12**  
So let me know what if you have any questions or thoughts.

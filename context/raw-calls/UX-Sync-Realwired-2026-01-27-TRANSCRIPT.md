UX Sync | Realwired - January 27
VIEW RECORDING - 47 mins (No highlights): https://fathom.video/share/7B_4W3C4LBmDgzHPsPvM95--pph7tuz8

---

0:00 - Val Vinnakota (brandcave.co)
  Hey, Jeff. Hey, Hey, Alex. So, real quick, Cody is a little sick today, so he won't be joining us in the meeting.

0:17 - Jeff Hicks
  So it's just you? Yeah, it's just going to be me. Are we waiting on anybody else?

0:43 - Val Vinnakota (brandcave.co)
  It's just going to be me, Jeff. I'll be just showcasing some of the updates I've made since our last call.  We could keep it short if you would like, Cody, to be involved as well. We can have a different call later.  You

1:11 - Jeff Hicks
  Yeah, well, let's get moving.

1:14 - Val Vinnakota (brandcave.co)
  All right, so the agenda for this call ad is going to be me. have tested out all the kind of authentication flows, like depending on the entry point and the type of user.  I'll be able to showcase how that onboarding is different with respect to each type of entry point of the user, as well as there are some updates on the team aspect of the user as well.  So real quick, I can show you how a regular sign-in will now look like. These are all impersonations. I'll probably have a better impersonation later in the app, but just for testing purposes.  So if a regular user signs in, they will have to use the magic link. That you sent over to their email and for the purpose of the demo, I'm just logging it in the console.  So a success message that will take them into that app. And that's pretty much how a regular user would sign in.  The same thing for the admin as well, but if it is a signup, there are three types of signups that is possible.  One is a new user who just got the link from our website or something they could sign up, or a bank has invited them, or maybe a team wanted to invite them into their team.  So for a regular user who's just signing up, this is something we have seen before, but there are some changes to the onboarding flow itself that I'd like to show you.  Thank you. They'll be logging in with, I mean, signing up with their email account. They'll get a magic link.  With success and an entry message here, as well as like powered by Realwired. We show that here as well.  And now we get into the onboarding flow. What's the difference between the onboarding flow from last time would be after the user selects whether they're an individual or a business user.  We see the change in the steps. So for example, an individual user, if they want to continue, they have an optional information where they can give their business name, whether it's a single user, they can skip this step altogether.  They still have an opportunity to kind of represent them as also the business or maybe give up site. And, of course, they will have to enter their personal information, any titles or experience they want to include.  And this is where they would include their licenses. One of the things that I've made sure from our last call was if they were to give any license that got expired or is about to expire, we can quickly showcase that here itself.  It's not going to restrict the user from progressing, but it's just going to be a warning early on. And the coverage area is where I have changed.  I have deferred the map component at this time and went with a simple search and select. So the first step here for the user would be to select the state or states they want to be covered to.  That would open up an additional section of accordions for them where they could select which all counties they want to select.  And one thing I did here is, of course, they can go ahead and select the number of counties. They'll be able to see them.  See how many counties has been selected. But if the user were to do a select all, they can go ahead and select them all and clear them all.  So if nothing is selected, it wouldn't be recognized as a state that has the coverage. So at least one county needs to be selected.  Progressing forward is the specialties and expertise.

5:26 - Edward Kruger (Realwired)
  Well, so we need to just make sure on the coverage because I kind of, I don't mind the flow.  Can you go one back? But we need to, if they haven't select Alabama, you know, we just need to have a model that says like, hey, you know, you haven't selected something.  We just need to have some sort of block here, you know, because otherwise what they're going to think is they're going to think, you know, I've selected Alabama because I put it in a copier and it's an action.  In an empty state. And so we just need to have some sort of, you know, block it to force them into action here.  That's pretty fair.

6:09 - Val Vinnakota (brandcave.co)
  I'll make sure that the model or something warning would appear. Going on to the specialties section, there are two types of things they could do.  Of course, had the professional designations or have the specialties here. So the way I'm looking at it from last time, whatever Jeff has said, there are specialties and sub-specialties.  So from a pre-populated list of specialties, which of course a RealWired admin has populated, they'll be able to select essential or something.  And within that, they can start selecting sub-specialties. These are all mock data we are using currently.

6:54 - Jeff Hicks
  Hey Val, where did you get the list of those property types?

6:59 - Edward Kruger (Realwired)
  So this this from AI.

7:01 - Val Vinnakota (brandcave.co)
  just wanted to...

7:02 - Jeff Hicks
  Oh, it looks pretty good just at a glance, but they're very similar, but subtly different for our customers.

7:14 - Edward Kruger (Realwired)
  So this currently is being taken from a static JSON, Jeff.

7:18 - Val Vinnakota (brandcave.co)
  So whenever we have a original list, we can just replace that JSON with that. Okay. One more thing that we have done, like, for example, if the user were to select, since you mentioned there could be a lot of specialties, and you want to ensure that the user don't select them all by default.  So we throw in a warning message that says, a bit more friendlier. It says, oh, wow, that's a lot of specialties.  Or selection can reduce your chances of matching.

7:45 - Jeff Hicks
  So you might want to review it.

7:47 - Val Vinnakota (brandcave.co)
  But if user says, I'm sure, we'll allow them while giving the warning here, saying he has selected all of them, so just consider.

7:55 - Edward Kruger (Realwired)
  Or if they were to say they want to review the selection, they can go back. If review the selection, so let me show you how it looks.

8:27 - Val Vinnakota (brandcave.co)
  Do you like me to move on or have any thoughts?

8:34 - Edward Kruger (Realwired)
  Jeff, you're on mute. Sorry. Yeah.

8:38 - Jeff Hicks
  Can you go back to coverage for a second? I think this is covered. Hold on. I'm going to feel some .  It might be more of a question for it. For residential appraisers, sometimes they search within Uconnect by their business address for a radius to say, okay, if you're 20 miles, 10 miles away from the property, so I guess it wouldn't be done here.  But rather, in the Uconnect?

9:33 - Edward Kruger (Realwired)
  No, Jeff, it needs to be done here. You want me to confirm that that's a thing?

9:40 - Jeff Hicks
  A radius?

9:42 - Edward Kruger (Realwired)
  I mean, it's a really, I kind of, I kind of understand the radius as like this, you know, dating app thing.  Yeah. Where, you know, you want to say, like, I really don't want to travel far, and so I only want to do things, you know, close to my office or whatever.

9:59 - Jeff Hicks
  So, we... you to have it here? We should definitely have it, yeah. Right, but if I'm filling out, let's say I have two banks, I don't know, I guess what you're saying is I'm only going to go, I'm going to pick the amount of miles I should go out to instead of zip code?  Yeah, that's what I'm thinking. Or county.

10:20 - Edward Kruger (Realwired)
  Yeah. And then maybe what we, you know, do we autocalculate it in the background? It's an effective, I mean, because it's, there's a difference between, you know, what licenses, you know, your certification and then what your work area is.  So I wonder if we should separate it by work area and licenses. So tell me where your licenses are valid and then tell me what you are willing to drive to.  You get what I'm saying?

10:50 - Jeff Hicks
  Well, think it might be an or thing like it's, you can do pick the counties or pick a radius of miles from your.

11:03 - Edward Kruger (Realwired)
  So pick the counties or like you would say that's an all year thing. Yeah, that's actually not a bad idea.  Yeah. Yeah. What do you think about like, how do we do that?

11:16 - Val Vinnakota (brandcave.co)
  So the way I imagined it, the coverage area would be different. I mean, even if they say like, let's, and they're going to have to add the states that they have the license in.  Maybe the license they are getting probably could be here, but they have only one address that has been entered at this point of time on the onboarding.  They can have multiple addresses later, but if you were to add coverage area, mean, sorry, in miles or the distance radius, we don't know the center point from which we need to proceed them with.  So here's what I'm thinking is we do licenses.

11:49 - Edward Kruger (Realwired)
  We do coverage. We add a new tab on the left, you know, let's call that work area or whatever.  And then give them the ability, you know, Thank you. Happy to work on all locations and all counties selected, or only willing to travel 20 miles, you know, from, and then you put in the address, something like that.

12:20 - Val Vinnakota (brandcave.co)
  So these appraisers, they have to do real field work. They can't work from a different state or from a different county.  So you have to physically visit the site. Yeah.

12:34 - Edward Kruger (Realwired)
  And so some of them just don't want to drive, you know, so even their license allow them to work in Alaska, I'm not going to accept their job.

12:44 - Val Vinnakota (brandcave.co)
  Okay. So let's say they did say, like, I belong to, I mean, I work in Bethel County in Alaska.  Yeah. So for each county, if they don't have an address there, we can't really identify the radius there. But I think what we want to do is, is.

12:59 - Jeff Hicks
  Thank And

13:00 - Edward Kruger (Realwired)
  Remember, what we most likely want to do is we want to tell them, like, so let's say we go to the next session, so licenses coverage, and the next section, like next on the left-hand side, there's a next section, and we call that section work area.  You know, and then you have an option to say, I'm happy to travel to any county, you know, in my coverage area, or you say, you have the selection where you say, only willing to travel X amount of miles from, and you put in the location.

13:36 - Val Vinnakota (brandcave.co)
  Okay, so that would essentially be there, either the address by default or other locations they want to enter in.

13:42 - Edward Kruger (Realwired)
  Yeah, exactly, yeah, so that might be office location, or whatever, you know, they want to do, but then we calculate it, you know, from that scope, and then they have the selection, all counties, or, you know, they only want to travel 100 miles from this location.

14:01 - Val Vinnakota (brandcave.co)
  Okay, and just to confirm, this would make them searchable within these parameters so that they would never get any bits out of their coverage?

14:09 - Edward Kruger (Realwired)
  so when the bank submits a bit, they will either appear or not appear based on where the bank, you know, the property is located because we would then be able to do an intersect.  Makes sense.

14:22 - Val Vinnakota (brandcave.co)
  Yeah, I can make that happen here.

14:24 - Jeff Hicks
  You're saying that if they want to override the business address that they can? Yeah. Yep.

14:37 - Edward Kruger (Realwired)
  That should take care of that. Any thoughts on the specialties when they're adding all the specialties there, sub-specialties here?

14:45 - Jeff Hicks
  We have to figure out how we're going to combine our lists. Because remember, each bank is suddenly different. know how to handle that one?

14:59 - Edward Kruger (Realwired)
  Just run me through. Is a problem again, Jeff?

15:01 - Jeff Hicks
  For example, let's say bars and taverns, I think I answered my own question. So, for example, let's say under restaurants, a bank gets more granular and they say fast food restaurants, full service restaurants.  It probably makes sense for us just to go up a little higher and grab all restaurants and not worry about – because if you have a customer that has 50 property types and the next one has 80, it's likely a subset that they drill down further and further.  So maybe we could come up with a compromise and – Yeah, we would need to define the standard and we need to have the banks operate within that standard as well.  So we would need to do it on both sides.

15:45 - Edward Kruger (Realwired)
  But I would say like let's focus on maybe like three levels, you know, and then maybe there's a category and everything else is other and, you know, we can define.  We can always see how many of them. This category is being used, and we can refine this list continuously.  Yeah.

16:04 - Jeff Hicks
  Yeah. Okay. Cool. I have a suggestion at this point.

16:10 - Val Vinnakota (brandcave.co)
  I can show that when I'm reviewing the RealWide admin view itself. Quickly finishing this off, we have a search and select for professional designations.  User can do that. Do a multi-select, as we discussed, and the review page, if they have populated it, they'll be able to see.  The quick difference on a business owner would be, they'll have to give their business information. Some of them are the type.  Yeah, and it's optional. There's no fax anymore. Business address, website. And they'll have to give their personal information as well.  And at this point of time, they can click on, I'm also an appraiser. That kind of resets. That gives them the ability to upload their licenses and specialty as well.  And if they say they're just a business owner, they have a team of appraiser. They don't select their appraisers, so they'll just continue to team setup.  And the team setup is something we have seen before where a user will be able to give the name, email, and by the end of this onboarding, they'll all have been sent the emails for that.  We'll also cover how an email is being received by somebody who gets a team invite shortly. The coverage is similar, the review is similar.  So can you go back to that for a second?

17:27 - Jeff Hicks
  Mm-hmm. So, for example, let's say there's a company in Texas, they have six different cities, all one company. So if I go to the business, and I assume that, right, this is going to be premier email, it's probably going to be the person that owns the property, owns the company.  Let's skip that for a second, go to the next one. baby. applies Bye Bye Give everyone that one. Bye  And tell us about yourself. is assuming it's the person that's either running like an admin or the owner, I guess.  So we've got the next one. So if I have multiple cities with multiple counties, let's say I've got just two cities, two cities, three people in each city.  Can you walk me through? I'd add the first team member, right? Right. And then they would have their own coverage and property types.  So at this place, the onboarding is only for the owner.

18:40 - Val Vinnakota (brandcave.co)
  So they would have had send their email addresses, an email to invite them into the team. So they will have to go through an onboarding which has their own coverage, et cetera.  So the business would get the cumulative coverage once all those details have been built out by the team members.  Okay.

18:55 - Jeff Hicks
  So it would be able for the other people in different cities to put their own cities. So it's so I  Their own coverage, their own property types. Correct. Still being aligned with the main company.

19:07 - Edward Kruger (Realwired)
  Yeah, so, and then, Jeff, that's an interesting point because, like, the logical side on the UConnect with NB to say, does this firm have the licenses to operate in this, you know, area?  Yes. Did they select this county? Yes. Who is the appraisal associated with that person? And then go and say, is it within their miles radius?

19:31 - Jeff Hicks
  Yes. Not to confuse it further, but typically they approve people, not firms, right? Yeah. You could have, let's say you're back in Texas, you have five cities, you have 50 people, you, a bank, they work with one bank, they said, I'm only going to work with Ed at the Dallas office.  Only Ed would be associated with them. That can happen. Yeah, because we're not going to approve all 50 people.  Even though they like the company, they're going to approve people. Right, right, okay. It still works.

20:07 - Edward Kruger (Realwired)
  So what we're effectively doing is the organizations become a management tool, but the work is still on an individual level.  Right, so for a year. With the billing going back into the organization and not to the individual.

20:23 - Jeff Hicks
  Right, so like drawing a herd, I would be approved and they would not approve Alan. Okay. So he cannot sign reports, he's not going to get any emails.

20:32 - Edward Kruger (Realwired)
  Got it, yeah, yeah, this should still work, yeah, that shouldn't be a problem. So it's just the filter criteria would work exactly the same as it would with the normal.

20:40 - Jeff Hicks
  Just want to make sure. Yeah.

20:46 - Val Vinnakota (brandcave.co)
  Interesting. So if the user were to say they're also an appriser, we'll have the ability to set up the license and specialties on the user themselves, as well as the team set up, and of course the team  coverage area, etc. Quickly, before I show the dashboards of how they change, let me show you how an admin dashboard looks like for RealWired themselves, because that's where users would be able to essentially create the specialties.  So the first section within the RealWired admin is they have a geolocation of all the vendors in VendorCircle with the kind of the number of vendors that are there in New Mexico or in Texas, and a table that gets filtered out, which shows all the vendors details.  They could also set the specialties. Right now in Jason's mock, I've only seen the specialty, but now that we introduced some specialties, so they'll be able to see all the specialties they can manage.  How many vendors are there, what is the specialty name, what's the key, and if they want to expand that, they can see the subspecialties in there, they can change individually, whether the subspecialties.  Blurge is something else. They can have add more here, specialty or subspecialty. So this is the place where they could actually manage and incorporate all the data.

22:09 - Jeff Hicks
  Val, are you talking about if the bank is fixing what somebody submitted?

22:15 - Edward Kruger (Realwired)
  This would be, so before we even get there, this would be all backend into helping manage the data categories and setups.  So this wouldn't, the bank wouldn't see this yet. I think there is a lot of like value in the bank, like onboarding people through this view, but I don't think for version one, like that's where we want to be.  We don't want to touch that side for version one, but I think what Val is really showing us is, you know, we can have like this administrative backend.  And so, you know, the messiest of the world, like our CS team, our onboarding team can actually go and collect these specialties and defend their relationships and manage them, you know, from a backend.  System.

23:00 - Jeff Hicks
  Is that because, let's say a customer says, I don't want to use this word, I want to change that word, we can do that?

23:06 - Edward Kruger (Realwired)
  I don't know if I want to go that far, but effectively, you know, it might most likely be that maybe we missed a speciality and everybody is pitching and learning about it.

23:22 - Val Vinnakota (brandcave.co)
  There's also an ability for the RealWired admin to actually look at vendor details here. Similar page will be available later as well.  we can actually see all the vendor details, just a read-only view of the licenses, coverage, connected banks of individuals.

23:42 - Edward Kruger (Realwired)
  Just a helpful view. a great support tool because it becomes like a little bit of a CRM for the vendors, you know, so if we launch in a circle and someone phones in and they say like, well, I can't see why.  Do I, I not get this or whatever, you know, the CS team can just go find that person. Can you go back to the...

24:00 - Jeff Hicks
  The one that showed the states, Val, and the banks. Maybe there's a different screen. No, it showed the list of the banks out there.  Oh, yeah.

24:10 - Val Vinnakota (brandcave.co)
  So it's within the vendor details and the connected banks that each vendor has.

24:14 - Jeff Hicks
  How would they see their licensing expires collectively? So let's say my E&O insurance has expired through three of these eight banks.  How would I know when stuff's expired?

24:33 - Edward Kruger (Realwired)
  When your license is expired? Wouldn't that be on the credentials and licenses? Oh, actually, it would be all the same, wouldn't it?

24:39 - Jeff Hicks
  It'd be expired. Yeah, it's over here.

24:44 - Val Vinnakota (brandcave.co)
  But if there is a place where the connection itself has an expiry date, we could also show that here.

24:51 - Jeff Hicks
  Yeah, go back to the previous screen. Yeah, that makes sense that your Florida license and your Georgia license things would not be concurrent.  All right. But your bank ones should be all the same, meaning your E&O insurance, if it expires, it's going to expire for all banks.  But how do I – so if I log in here and I get a message, hey, my insurance is outdated.  So this is an admin page.

25:19 - Edward Kruger (Realwired)
  Just remember that this is not the dashboard for the individual. Oh, got it. Yeah, so – but to your point, like that information should be the number one thing on the dashboard for the individual.  Yeah, you got it here, but not just with insurance.

25:32 - Jeff Hicks
  I mean, with the banks.

25:35 - Val Vinnakota (brandcave.co)
  Okay. I'll make sure that I'll add to the regular dashboard as well. Let me quickly move on to that then.  Real quick, I just want to show you how an existing user, if a bank invites, let's say Capital One Bank has invited a user, and they already exist, Inventor Circle, the way they would be able to  To see that is they get the email, opening that email, they'll have this magic link that says Capital One has invited you to Vendor Circle to connect with them.  So since they already have an account, they'll just sign in and connect. smooth.

26:15 - Edward Kruger (Realwired)
  I want to make that this looks really  cool, man. Like, I love this. I love that Capital One invites you to Vendor Circle and then Powered by RealWire along the bottom.  This is phenomenal design.

26:30 - Val Vinnakota (brandcave.co)
  Awesome.

26:31 - Jeff Hicks
  Because they're not going to know what Vendor Circle is when they see, because it doesn't say Uconnect anywhere, but it does say RealWire.

26:39 - Edward Kruger (Realwired)
  Yeah, so we probably need to, I don't know, maybe because we have half the space for the login and the secondary space, we can maybe play a video, you know, in that secondary space, a marketing video that tells them what Vendor Circle is.  It's, you know, something that just kind of keeps the energy flowing, but yeah, I kind of like this. to re That's looks  It's very sleek.

27:03 - Jeff Hicks
  All right. Yeah. Video totally makes sense. I can incorporate that here.

27:10 - Val Vinnakota (brandcave.co)
  So them signing in would be essentially them going into their account. But the only difference since they came through a bank connection would be after they successfully log in, they'll see an immediate model that said, hey, you're connected to Capital One.  So you know that it's part of your connected banks now. You know what is phenomenal about this?

27:35 - Edward Kruger (Realwired)
  don't know if you realize, but these guys are using magic links. And what's so powerful about a magic link is the moment you accept the invite, the profile gets generated.  You know, and so what's really cool about it is you can click the link and you automatically log in and you're already in the system.  And whatever information was captured about you is already populated in the system. So you don't kind of. Like hit that snag where I'm like, okay, I got invited to a thing and I open it and now I need to press seven buttons before I can start to use it.  And that's a really powerful feature to onboard users because you remove the resistance immediately.

28:20 - Jeff Hicks
  Got it. They're back in their dashboard.

28:23 - Val Vinnakota (brandcave.co)
  For example, if the user themselves are new and a bank has invited them, it would be slightly different because this would be their onboarding as well.  So once they have the invite from the bank, they are able to create their account and connect. So which takes them to our usual onboarding flow.  Real quick, I also want to show a similar pattern here for a team invite where a new user has been sent, like the way the onboarding has happened.  So the difference here, instead of a bank invite, you will have the The company themselves, like I could probably incorporate the logo as well, but Sarah from Coastal Appraisal Group has invited to be an appraiser with them.  So you can create an account and join their team. So again, similar onboarding flow, that's about it. But real quick, let's just get into the meat of it.

29:25 - Jeff Hicks
  There are some populated accounts here.

29:28 - Val Vinnakota (brandcave.co)
  We have seen most of the individual. So let me quickly show you the business render themselves. So the business owners...

29:36 - Edward Kruger (Realwired)
  I just want to make this note. Really important on the dashboard is the most important thing here is expiring licenses.  That's what we're trying to kind of get these guys, you know, ahead of. So we need to bring in not only the work, but also kind of like license management.  Yeah, and that's the thing to manage. Absolutely.

29:56 - Val Vinnakota (brandcave.co)
  I'll actually find out some other place. This is as well where it's going to be important to populate and I'm currently in the process of entering some of the useful metrics.  For example, we have the team metrics, the utilization, the total bits, the average business rating, etc. There's also like the performance metrics like within the team itself, like how they're performing, how many bits they have captured, the volume trend.  And for the business owner themselves, they can actually gauge the top performers given how many bits they have turned around this month, this week, apart from all time.  Kind of creating that, you know, like maybe or arching competitiveness. And we have also seen like the requests. So for a user who's an owner as well as an appriser, they will see the bits of all their team members, just so they know that it's assigned to somebody, they are following that up.  But if it is assigned to you, you will see that yourself as they're signing for that bit. they're fall técnя,  Same was with the report, and they can obviously just filter that out and just see their own bids.

31:08 - Jeff Hicks
  Can you click on the action? Well, action is a dummy link right now.

31:14 - Val Vinnakota (brandcave.co)
  Like, I don't know where the exit point is for it. think it connects you.

31:17 - Jeff Hicks
  Did you want to have them bid within the vendor circle, or do you want to keep that web form?  No, version one.

31:26 - Edward Kruger (Realwired)
  Version two, definitely, I want them to bid together. The reason why I want them to bid here in version two is because I can actually see, you know, let's say bids come in, you know, we can have a little bit more of a real-time play here, you know, going, you know, so we can make this environment a little bit more exciting, you know, with people finding a reason to be here.  But, no, I don't want them to bid in here for version one.

31:52 - Jeff Hicks
  But in version one, is it going to show the stats? here you. don't to be

32:00 - Edward Kruger (Realwired)
  think in version one, it, yeah, we should be able to have the statuses, yeah. I mean, that'd be cool.  Yeah, yeah, we should be able to have it. Yeah, at least just that, but then the ideas on the action, when you click view, you'll open up that email link, you know, that you get, where they invite you to bed.

32:19 - Jeff Hicks
  The web form?

32:20 - Edward Kruger (Realwired)
  The web form, yeah.

32:25 - Val Vinnakota (brandcave.co)
  The documents, state licenses, et cetera, for the appraiser, come owner, they'll be able to see and manage over here.  But the different part here is the team members themselves. Like, this is an account where the business owner has multiple team members.  Some of them are appraisers, some of them are non-appraisers. They can even miss staff. They should be able to see quick metrics, how many members act to any pending invites on that, as well as invite new members.  But the cool part is they can look at the profiles of each of the appraisers or any of the staff they have.  So let's say... Maria is an appriser, they want to look at, they have a quick overview of their information, whether they have completed their profile status, if it's complete, this will be gone.  Quick stats, and the credentials they have actually uploaded. And the admin themselves has the ability to edit them or change them.  If they find them licensed, the license is expired, they can change that if they have the document. Same with the coverage areas, they can edit, add a new area if they have missed on something.  And they can see the connected banks, but just for that appraiser, these are the banks that they got connected to.  And finally, this is a data I want to give that, you know, the owner an idea about this team member themselves.  Their entire stats and performance.

33:42 - Edward Kruger (Realwired)
  Could we just jump back to the connected banks? You know what will be pretty cool there is, is we most probably know when last we had an interaction with them.  And, know, and it might be because remember, we want to facilitate conversation and so I think the first approach towards that is.  It's kind of like say, you know, math completed bid on or, you know, whatever that is. But just start to kind of like tell them like these are the fresh ones, you know, these are the older ones.

34:11 - Jeff Hicks
  You mean like green, yellow, red, like green means you get the most bids from? I'm thinking something.

34:18 - Edward Kruger (Realwired)
  I'm thinking like being able to do that on the dashboard side, know, bringing in like where your credit is coming in.

34:24 - Jeff Hicks
  Like on Facebook, it says you have three unread messages. Yeah, exactly. Yeah, it's a month, you've got 20, zero.  Yeah, something like that. Yeah, exactly. That's a cool idea, like a little badge of the last month, last 30 days.  Here's the bids you got.

34:40 - Edward Kruger (Realwired)
  Yeah, the activity, you know, like we do those train trackers, you know, on these cards. You know, but doing like a train tracker based on activity, you know, and you can tell if activity is up or down.

34:53 - Jeff Hicks
  I think, you know, for Val's point of view, yes, if I bid 50 times, I only got two jobs.  That's not very good. That's But I do think the number of bids I get from somebody is more important.  It shows that I'm at least getting a lot of inbound requests. So if there's a badge of, not that I actually got it, but I actually got requested 50 bids from Citigroup, 10 from Alley, 5 from Northwest, I can see at least who's the most active.  I might not be getting them until I click into it to see my acceptance award ratio. Wow, a ton of stuff from Citigroup.

35:31 - Edward Kruger (Realwired)
  Yeah, that's super cool. Yeah, so maybe like having, you know, bids, like three categories where we say, you know, number of bids received, number of bids sent, you know, number of jobs won.  know, just having those three, you know, numbers like on each card would be really cool. What was the third one?

35:52 - Jeff Hicks
  I can see a number of bids, capture rate. What was the third one? Win rate.

35:56 - Edward Kruger (Realwired)
  Well, that's true.

35:59 - Jeff Hicks
  So...

36:00 - Edward Kruger (Realwired)
  The number of bids received, right, the number of bids sent, so because I can receive 100 requests to bid, but I've only done 50, and then you want to know how many of those 50 you actually won.  So it's about received engagement and then win rate.

36:18 - Jeff Hicks
  Well, the last two are the same. So if I get 100 bids and I got 50 of those jobs awarded to me, it's just 50%.

36:26 - Edward Kruger (Realwired)
  But isn't it 100 invitations to bid, and then 50 that I actually participated in, and then win?

36:39 - Jeff Hicks
  Well, no. They're going to bid it out to you, or you're not going to even see it.

36:44 - Edward Kruger (Realwired)
  Okay, but it's still your choice to respond to it, because that bid expires.

36:52 - Jeff Hicks
  So let's say I get 100 bids, and I decline even bidding on 10 of them, is what you mean?  Yeah, exactly.

36:59 - Edward Kruger (Realwired)
  Yeah, I

37:04 - Jeff Hicks
  All right.

37:05 - Val Vinnakota (brandcave.co)
  So I can imagine more details of individual banks where they can actually see the recent activity and the more bits they have received from each of the banks.

37:12 - Edward Kruger (Realwired)
  It's also really important to bring that into the dashboard and be used to stop-up lines so that you can kind of like do that roll down.  For sure. Like I'll have a mock widget there available.

37:21 - Val Vinnakota (brandcave.co)
  I'm experimenting on the widgets here. For example, for each member, they can actually see how they performed by each bank already here.  For example, they have had 45 bits with Wells Fargo and the bank has rated them 4.8 so far. And this is the performance by specialty widget.

37:41 - Jeff Hicks
  Can we figure out what the stars mean? Is that just made up at this point? It's just made up.  Okay.

37:50 - Val Vinnakota (brandcave.co)
  It's assuming like they were rated on five, like whatever the bank's unique scoring system is. Since there's no centralized system, how they capture that score.  But yeah, so out of five, we'll translate that and try to give them, assign them for here. And their rating essentially becomes the average of all of them.  I will try to pull in some of these into the dashboard themselves. Yeah, one thing in the dashboard itself is for a regular user, a single user, they have their performance.  What the rating is, what the cohort's average is, we can actually define the cohort by either the peers, whether the age demographic or the region demographic, ensure they rank a percentile essentially out of that region or the same coverage that this appriser is doing.  They can view more and actually see how the breakdown actually happened. This is a game changer.

38:55 - Edward Kruger (Realwired)
  Scroll back up.

38:56 - Jeff Hicks
  Is the 4.7, the rating across? Cost is six or eight banks, average.

39:10 - Edward Kruger (Realwired)
  Yeah, this is awesome, man. This is going to be a game changer because this is how you change behavior.  All right, that's good feedback.

39:22 - Val Vinnakota (brandcave.co)
  That gives me an idea like what kind of widgets I could introduce in the dashboard now.

39:30 - Edward Kruger (Realwired)
  Of course, you'll have your recent activity and work.

39:32 - Val Vinnakota (brandcave.co)
  But now that I know like banks' activity or the bank recent bits, cetera, so it's I can add them here as well.  Other than that, there's just your average account settings where they can enable their notifications, come up with a subscription plan.  And I do have some questions about the subscription plan. Do you envision a business type user with more than one team member versus a single appraiser to use VendorCycle at a different tier system?

40:01 - Edward Kruger (Realwired)
  Yeah, do. You know, purely because I believe there's different products that we can offer these vendors. For example, we want to offer them auto review or AR review product.  And so we want them to have the ability to, like, let's say they're getting their first hundred appraisals free every month, you know, and that's on the basic tier.  And then there would be like a pro tier and the next tier. And maybe within the next tier, they get more dashboard insights, you know, from bricklayer on.  the next tier, they get more insights from more accounts available, you know, to do reviews. And so businesses would probably have different values based on the sizes.  So you might buy tier one for a size from zero to five and tier two from a team from five to 10, you know, or something like that.  So, but that's kind of like the idea between the tiers.

40:55 - Val Vinnakota (brandcave.co)
  Makes sense, The reason it's looking blank and I'm still trying to get my head. around it is, if you were to give them the tier option, we have to ask the question whether we introduce that within the onboarding phase itself, like we probably might need to give them a step there to select their tier, proceeding forward.

41:16 - Edward Kruger (Realwired)
  Yeah, this is most likely for V1, we just want parity, so we're just going to roll out everybody on the same, we're not going to do AR review forms integration as of EA, so I think like that's a problem that we need to solve down the line, you know, and Q3, Q4, so I think for now, we should be good.  Makes sense, I'll have this more ready by then, but yeah. Yeah. Okay, Jeff, is there anything that you've seen that we dramatically need to change here?

41:46 - Jeff Hicks
  Can you go to the bank, the bank's login? Sure. And I want to add a new user. I want to send an invite to them.  Well, I wouldn't log into my own bank.

42:23 - Val Vinnakota (brandcave.co)
  I'm sorry, coming in, please. We don't have bank logins right now.

42:27 - Edward Kruger (Realwired)
  I think you're referring to maybe the admin log in, but right now we're only doing this from a vendor's perspective.  So the banks will operate through Uconnect at this stage. Okay, got it.

42:38 - Jeff Hicks
  Is that something that we need to look at?

42:41 - Edward Kruger (Realwired)
  know, Jeff, do we want to kind of do the second part of it? I'm just thinking of the maintenance of the list.

42:47 - Jeff Hicks
  So let's say you're a bank and you've got 1,000 people and you want to add somebody, want to delete somebody.  Should they do that? Is it easier to get this done? And just do that in Uconnect the way they do it now and not try to do it in here.

43:00 - Edward Kruger (Realwired)
  Effectively, it's not a pretty interface, and I do want to take that part out. I do want to take that part out because it creates this as a single, like, the moment I'll move it out of Uconnect, it's a standalone product.  So I do want to move it out, but I'm thinking about, like, parity plate first, which is V1, let's just get people onboarded on this, and then V2 is, like, how does this become a product?

43:21 - Jeff Hicks
  So if you want to do the bank maintenance on V2. Yeah, that's what I'm thinking.

43:27 - Edward Kruger (Realwired)
  Like, I think that the reason why we build the admin screen is because it's fundamentally almost the same thing.  You know, it kind of starts the pipeline down that conversation, but it's about, like, let's just think about resource management.  I don't want Val to spend energy and effort on that problem right now if we still, like, we don't even have a product.  Like, why would I build, like, the best thing ever in mock-ups if I don't even have version one, you know?  Yeah, yeah, yeah, fair enough.

43:53 - Jeff Hicks
  Can you go to a certain vendor, any vendor with a licensing? I saw you had a PDF. I will show you what some bank people do, which, again, maybe this is version two.  I'll go to the licensing. Let's see if they're appraised with the licensing. So click on that PDF. Some people actually confirm one at a time that this is legit.  They didn't upload some bogus PDF, and they double-click and look at it and read it. Go to the next one.  Go to the next one. This is still far superior because right now they have to, like, log in and log into all sorts of stuff.  This is great. I'm just adding, to let you know, sometimes they manually, they being the bank, manually. Yeah, we need to have an approval process for those, you know, vendors.

44:41 - Edward Kruger (Realwired)
  So I think when we kind of get to the bank side and we want to send the invites and how does that look like, you know, bringing it into a place where, you know, you've reviewed them.  They have a rating. Maybe someone else has said something about it. You see the overall score, you know, you kind of get the sense of, like, okay, yeah, you verified the license.  And maybe what we can do is if it's been verified with five different banks, you can have like a little blue verification tick mark next to it.  You don't have to do it, you know.

45:12 - Jeff Hicks
  On Y2, you know, version 2.3, we probably don't want to use AI for the approvals. no. How do humans do it?  But what you do is this is the same as ways.

45:21 - Edward Kruger (Realwired)
  Is the roadblock still there? Yes or no? know? Yeah, yeah. Fair enough. Perfect.

45:26 - Jeff Hicks
  Yeah.

45:26 - Edward Kruger (Realwired)
  So kind of like that's where we want to go with this. Yeah, I agree.

45:30 - Jeff Hicks
  Cool. Nice. Looking good. Thank you so much.

45:36 - Val Vinnakota (brandcave.co)
  With that in mind, other than the polishing few extra metrics on dashboard, we do have, you know, a place where we can discuss on, I mean, you guys were discussing the last time as well, like how do I hand off this to Jason?  If you can get that conversation started, maybe the next time we meet, we'll have a...

45:53 - Jeff Hicks
  Yeah. Yeah, I'm happy to take that on, you know, Jeff.

45:59 - Edward Kruger (Realwired)
  That's just... Let's quickly chat on the next steps here and then we push it. But Val, can you send me a link to all of this?  Oh, yeah, absolutely. What do I do? Do I vibe it? What's the best way of using this, Val?

46:24 - Val Vinnakota (brandcave.co)
  The link itself?

46:26 - Edward Kruger (Realwired)
  Yeah, so can you send me a link to this and then just instructions I've seen you, you kind of have to get the match link to bypass to the next step.  Can you just send me up how to do that?

46:37 - Val Vinnakota (brandcave.co)
  I could spend a little bit of time and kind of make this page a little better, the impersonation a little bit better.  And yeah, it should be much more important. Awesome.

46:46 - Edward Kruger (Realwired)
  Thanks, Val.

46:47 - Val Vinnakota (brandcave.co)
  No problem. Thank you. Okay, team.

46:52 - Edward Kruger (Realwired)
  See you later. Bye. Bye.

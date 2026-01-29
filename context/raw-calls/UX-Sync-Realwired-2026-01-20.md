# UX Sync | Realwired - January 20, 2026

VIEW RECORDING - 56 mins (No highlights): https://fathom.video/share/kxoXF8RZ1byu51uMhvuAwYBNRjru61p4

---

0:00 - Cody Miles  
  Pull up your screen so that we're ready to go.

0:03 - Val Vinnakota (brandcave.co)  
  Yeah.

0:20 - Cody Miles  
  How much have you gotten done since the feedback I gave you earlier? I did, let's, when we show Ed today, let's be sure we start from the beginning and do onboarding and then get into dashboard stuff.

0:45 - Val Vinnakota (brandcave.co)  
  But real quick on the business side as well, we just have the, my work, the requests, invites, and documents, everything is the same. The teams exist, as you can see their profile, the user changes their roles.

1:01 - Cody Miles  
  Isn't the documents going to be on a per appraiser basis? These credentials are for each appraiser individually.

1:16 - Val Vinnakota (brandcave.co)  
  Correct, but wouldn't they be entering that? I mean, that's the reason like I had previously shown that the documents of the user and the businesses are different.

1:25 - Cody Miles  
  But Val, you need the ability for the admin to upload this on behalf of the users. So you need a shared IA that works the same for either use case, and it's really not that different. You have the appraiser profiles and the ability to manage the credentials, the state licenses, the coverage and insurance per appraiser profile. So if the user is themselves an appraiser, they need to set up their appraiser profile.

1:58 - Val Vinnakota (brandcave.co)  
  So... So... So... So are you thinking like within the documents, we'll have two sections for the user and the rest of the appraisers? Let's say even the user is an appraiser.

2:13 - Cody Miles  
  So when you add a user, you're setting them as either an appraiser or like an admin, right?

2:22 - Val Vinnakota (brandcave.co)  
  By the way, why is profile there?

2:24 - Cody Miles  
  Why isn't it up in the top right where the profile is?

2:29 - Val Vinnakota (brandcave.co)  
  The reason for pulling it over here was Ed kind of mentioned we wanted profile to be one of the main pages in one of the previous calls. That's the reason I moved it from here. And this was a change I made in the previous iteration. Okay. So think about it this way.

2:47 - Cody Miles  
  Your profile, you and are going to have to talk about this. I'm going to let Ed in now. You're going to start from the beginning and I'm going to call out all the things that are still wrong about this as we go through it. Mm-hmm. Hey, Ed. Can you hear us? Here we are. Hey. Hey.

3:28 - Ed  
  I'm from the, whatchamacallit, what's this, the conference room? Conference room in Tampa, Florida. Yeah. Yeah, so you got me, yeah, you got me and Jeff McCall. Sorry, what was that last part?

3:46 - Cody Miles  
  Cut out for a second. Oh, you got me and Jeff both on the call today.

3:49 - Ed  
  Oh, hey, Jeff. Hey, how are you?

3:52 - Cody Miles  
  Jeff, have a light behind you, so you look like an angel. He is an angel.

3:58 - Ed  
  He is an angel. I'min

4:02 - Cody Miles  
  Awesome. Cool. Well, today we have a few updates on Vendor Circle. If there's anything else that you want to discuss, certainly we can. We're not quite there on the vision I'm casting, but it's worth kind of checking in on the progress that we're making to make sure it still makes sense to you. So Val and I were talking earlier today about one of the biggest changes that came out of our last meeting is kind of the idea that there's not two separate account types, like a single profile versus a business profile should really be one experience. And we haven't really nailed that yet. So still working through it, but we can, you know, show you what we have so far. Yeah, I think it's a great idea.

4:43 - Ed  
  We can just do a refresh for Jeff and take him on the journey just before we start just quickly. I'll reiterate that the problem that we're trying to solve here is not the individual vendor. I think the individual vendor on Vendor Circle. It's got a very specific flow. It's A, B, C, D, you know, just do the tasks. The problem that is slightly complex is the vendor that's a small business that's got five or six vendors, you know, reporting into a business that is bidding for banks. Within the same company? Yeah. Yeah, so here's something, Cody. The bank's policy typically approves the appraiser, not the firm. Yeah. So if you've got an appraisal firm, let's say there's five appraisers, you may have one guy or girl that's the approved appraiser for that bank. might have two. Their vendor approval process is arduous and clunky. So typically banks, once they've cleaned up their approved appraiser list, they don't generally like to add or really take people off it either. They like to get approved. People, not the company. So, and this is some of the complexity that we mentioned because from the other side, from Vendor's circle side, the company wants to manage everything it does. Right. So it doesn't want to have a login for a person. It wants one login and then all of the people associated with it, even if some of them work for Bank A and some of them do work for Bank B. And so this is this complex onboarding step, and that's when I got Cody and the team to work on. So let your mind just, that's where we are, that's where we left it. So just let us look through the flow and then let's just see if we can go. Yeah. And there's some known issues as we go through this.

6:43 - Cody Miles  
  So just kind of calling that out that this is very in flux. Even on our side, we're not settled on it. So Val, what if we start with not the sign-in flow, but the create account flow? Sure, Kyrgyz.

6:59 - Val Vinnakota (brandcave.co)  
  All right. All right. Pardon my voice, guys. It's a bit cold in Dallas. So, yeah, so for a new account creator, we're going to be starting with some, you know, some boring stuff. So when creating an account, we are emulating the experience of how they could verify through email. know, and they will land over here. They will start welcoming them into the app itself. You can now split this into two pages, but it's got to be one where we'll explain that, you you're going to gain all this when you're about to enter into the vendor circle. Sorry about this, Pauzian.

7:46 - Ed  
  I love this because the idea is that you're going to now start going through a flow. And what you want to do is you just want to tell them, listen, it's going take 10 minutes. Here's the benefit to you. We want you to, you know, finish. Because if they drop off, we lose that, we need to pick them up after the fact. If they feel like, oh, it's going to be 20 questions, they might not be able to answer it. So what we do is we prompt them, hey, before you continue, this is the stuff that you might need. This is the benefit that you're going to get. Just stick with us going through the call. Yeah, Val, can you go back up one screen? Are you able to do that? Yeah, right there. So what happens now when they, and you're talking about existing appraisers of a Uconnect client. So someone that creates now, a new person that wants to get onto vendor server, we need them to finish a program. We need them to upload all of the documentations. Are they going from the old system? So they're an existing appraiser that needs to use the new vendor circle? vendor circle. So there might be some information that they need to refresh, or it might be completely a new user. Yeah, I'll just throw this out. So currently, if I get an email, I also have I'm appraisal company, so I happen to be a vendor, so I get to see what our UX, UI looks like from this perspective. And it comes in per bank, which is obviously we're getting rid of that. But the difference is if I see a very bank-specific logo, I have to tell this out. Otherwise, I will not get work. This might suggest that it's subtle. It doesn't need very many words. Like write, connect with multiple banks easily. We're designing it for Uconnect. Like, these are not external people wishing to get on a list. These are existing Uconnect vendors. So that second word, multiple banks, not that we wouldn't necessarily list. Yeah, we can change this. I'm just letting them know that you want to see stuff. So that might be an interesting thing. We might want to include some bank logos on here. just keep that in mind. Yeah. So...

10:00 - Cody Miles  
  The requirement I'm going to write down here is if we're coming in from a screen that we should be receiving after we click on the link in the email or whatever, would be something more like Bank A invites you to create your Vendor Circle account in order to do business with them. You show their logo, you show the Vendor Circle logo, and then you either invite them to log in to accept the invite or create an account.

10:23 - Ed  
  Yeah, because otherwise I don't know what Vendor Circle is, and I don't see VConnect or Realwired, so it doesn't tether me to just delete it. Yeah, listen, I got the invite showed. Yeah, this is a UConnect plan. What do you think about the logo? I like it. It's a little bit better than the one that we had, right? It's better. The other one has little bubble people, and I like it better. Yeah, me too. Cody, we got some feedback on our logos. You know, we had another company present us with something that was, it looked like a glyph. It looked like adding news. users to a site, know, something that you would put on a button and it was a really bad live. And the feedback that that company gave us is that our logo in itself is, you know, basic. And so we should keep on sticking with that kind of like simplistic, you know, format. I'm not happy with that response. You know, I like this more, but I was wondering, you know, is there a limit in terms of how we can actually approach logos going forward because of a company logo? there like a brand association that we need to speak about or be aware of?

11:42 - Cody Miles  
  Interesting. Well, I could see the reason why you would just in general want to brand this as its own thing, that is not necessarily you connect, but I wonder if how much brand leverage or brand power How does it get by connecting UConnect with, or Realwired in general, with Vendor Circle? You know, Vendor Circle powered by, you know, Realwired. Yeah, that's actually a cool idea.

12:13 - Ed  
  Okay, we could talk a little bit about it. I just wanted to make sure that, you know, we're not necessarily hindering ourselves, because I want to focus and be mindful of time. But if that's something that we just need to discuss in terms of, like, a brand awareness, maybe we should just talk about that and have the discussion. It could be as little as adding a Realwired logo on the bottom right. Yeah, I kind of like that idea, powered by Realwired. Okay. they need to be tethered. Yeah, of course.

12:43 - Val Vinnakota (brandcave.co)  
  I missed that on these screens, but within the app, you'll see it is always powered by Realwired. Yeah. So the expectations.

12:56 - Ed  
  And here's where they would start the onboarding flow itself.

12:59 - Val Vinnakota (brandcave.co)  
  Yeah. And now with the first question about the onboarding is, you're going to ask the user to let us know whether they're an individual appraiser or they own a company and they manage a team of appraisers. The change that you'll see when the user changes between these two is the kind of steps or the kind of information they'll be filling in. Cool.

13:23 - Ed  
  So let's just go with the individual appraiser.

13:26 - Val Vinnakota (brandcave.co)  
  So I'm an individual appraiser. I'll start by including my personal information, my email, my title, my experience, the contact information, and state licenses. I could add multiple state licenses here and the expiry date, the state, the license number. And the coverage area here, I kind of wanted to give an ability where the user can select here. I can quickly select on the map where I'm eligible to practice along with the zip codes and count. Hey, can you go back one screen?

14:04 - Ed  
  Can you go down to the county level? You just type it in. That's not the test flow here.

14:14 - Cody Miles  
  I think it should be obviously based on the state that you select in.

14:18 - Ed  
  So, for example, if you click on Florida, does it give me availability of what to click on? Yeah, that's a good pull-up. Because otherwise I have to manually type in like 20 counties. Yeah, and they don't want to be false text in the system. So, yeah, that's a good one.

14:36 - Val Vinnakota (brandcave.co)  
  Yeah, I'll make sure that this is context-specific. I guess some of the reverted changes kind of reverted into previous state.

14:42 - Ed  
  But, yeah. It's just, know, Jeff, while you're here, like, how many counties am I selecting? Like, is it quite a list? Like, for me, I would be in Florida, would have like 10 counties, just myself personally. Like, some people might be licensed in multiple states, might have five counties in one state. Like, don't know.

14:59 - Jeff McCall  
  15 counties in another state, but generally speaking, it's probably five to 15 counties. Tim, would want to kind of like prevent us from typing stuff, you know, and then helping them out searching for stuff, you know, like if we can have like some sort of list, you know, to just select and add, that's a much faster approach.

15:20 - Cody Miles  
  Yeah, there should be a multi-select with the ability to select all for each state.

15:24 - Ed  
  Yeah, good idea.

15:26 - Cody Miles  
  What about Zipcos? Is that even necessary? Hmm.

15:31 - Ed  
  I would say no. Yeah, can't see you. Did somebody from my team tell you to put in Zipcos? No. I don't think that's something from our side, is it? I mean, I would say get out. Well, take that out because that would be painful to put in. Yeah, and then we need to false it back. So I think for now, let's just drop it. Yeah, would drop that for now. That seems insane. I see why somebody might put it, but I'll take it out.

16:13 - Val Vinnakota (brandcave.co)  
  Roger that. I'm going to do the penultimate step here. User will be able to select from the list of specialties that we included. I'm not sure, like at this point, we want to include special abilities because they can always add a new specialty in their profile itself. So here's where people get stuck.

16:34 - Jeff McCall  
  If I click on commercial, is there any subset behind those? So give me an example of that. Commercial would be office buildings. It would be shopping centers, restaurants, bars, bowling alleys, funeral rooms. Is that important? Yeah, that's probably the most important thing. So if you clicked on, so for example, multifamily, there might be 15 different kinds of The multifamily, affordable housing, apartments, you know, a quad, duplex. And what happens with this specialty, this is where, just to give you guys some feedback, if I click on commercial and I've got 30 different specialties within commercial, most appraisers click all, like select all. And that's what we want to discourage because it's unlikely that I would be, I might be capable but not competent to appraise every single commercial property there is. Like a marina is hard, right? But appraisers tend to do that. So we're trying, if you can, in a UX to dissuade them from just going, yep. But the specialties is super critical because, and I know the appraisers, each of our customers have slightly different words, but it's critical to say, I need somebody that can appraise an office building in downtown Dallas. And not everyone, if you select commercial, you need to break down, and I can give you the data if you need it, but that's very important because that is a specialty. You're at level one. There's a level two where they want to get granular, and that's super important to them. Yeah, that makes sense.

18:24 - Cody Miles  
  Yeah, we'll model out the subspecialties. It'd be helpful eventually. We don't have to have it to get the UX pattern right, but eventually to have whatever those specifics are for the subspecialties. Yeah.

18:36 - Jeff McCall  
  And the way it could even be handled would be a cute sentence saying, hey, I see you selected all. Are you really a specialist in these 80 things that you just chose? Yeah, I think it's not about are you really. I think the best pattern day is to say like, oh, wow, know, kind of like act surprised from the system. So you kind of have a pop-up box that says. Oh, wow, I've seen you've selected 300 specialties and then go over a little bit of like, you know, be aware that, you know, continuing with 300 specialties actually limits your chances of finding a good position, you know, because of the selection type you can. Perfect, you're to be penalized. Yeah, yeah, but, you know, acting surprised from the system and trying to correct wow, you can do 300 copy sites. Yeah, probably not. I like that. the designations, Dave, just walk me through that. Those are appraisal, like, SRS, MAI, member of the Appraisal Institute, those are various associations that provide. Multi-sling, so we know. Yeah, we know about those slides. There's maybe a total of maybe five or ten. Okay. Awesome. That's good.

19:55 - Val Vinnakota (brandcave.co)  
  All right. Finally, we'll have a review of profile. your right. From the onboarding steps, I guess I haven't filled in anything, but you'll see them all filled in over here. And the next step is where we'll have the confetti page upon onboarding. Sorry, before we...

20:15 - Ed  
  Yeah, I just love that we were speaking about the confetti, you know, for such a long time. Awesome.

20:24 - Cody Miles  
  Before we dive into the getting started and the onboarding flow and the dashboard, I think it'd be best if we kind of take one step back and then look at the onboarding flow as if it were a business and not just a single appraiser. Yeah, good idea.

20:40 - Ed  
  Yeah, let's sit down. And they're having to create account because it's not SSO. Like, when they log in... To Uconnect now, they don't have a username or password. So that's new right there. Yeah. Yeah, it's to be new. All right.

21:14 - Cody Miles  
  All right.

21:15 - Val Vinnakota (brandcave.co)  
  If the user selects that they're a business owner, so now you're asking that those steps are slightly changed. The next step would be for them to fill in the business info, the name of the business, the type of the business, the EIN ID, yet established probably. And the primary contact information for the business, like the main address, the main phone number, the email ID, and optionally the website itself.

21:46 - Cody Miles  
  Before we move on from this, this is where I start thinking we need to make sure that we're asking the right things on either side. And wouldn't we still need this information? I don't know that business email makes sense because we have the person. But maybe it does. The property, like the account is the account, regardless of whether it's a business or it's a single appraiser. And we can change the onboarding flow to like perfectly match the flow for each type. But I guess I just have some concern that we need this information and business information on both flows.

22:23 - Ed  
  Because I guess the question is, if you act as an individual appraiser, you know, so if you're not just Alan, you're not part of a company, does he need to provide documentation showing that he is an incorporator? Like I said, they approved appraisers. So if I owned the company, I had five appraisers, I guess I'd have to do this five times. No, no, no. This is because this is the onboarding flow. So this is the onboarding flow for business. So you'll have to do it once. The question, however, is if you're an individual appraiser. So if you're just Jeff out in the wild working for yourself. Do you need to capture this information? The business? The business information. we're assuming that you connect clients, and we already have this information. Yeah, but assume new people. Assume brand new. Yeah, brand new people. Yeah. So you want to compare the business fields to the individual field? Well, we're asking, should some of these fields, should these business fields be part of the individual field? You go back to start over, see what questions you're asking. Go back to the original business. Yeah, not that one, the business info. No, that's good right there. So the name, the type. Tax ID. Why do I care about that? Why am I tracking this? Well, that's what I'm asking. Yeah, yeah. Because. think the invoice thing you need is tax ID, and your established might be credibility. Yeah.

23:52 - Cody Miles  
  So we don't need EIN, but we do need your established? Is that what I'm hearing? I don't know. Keep everything so far.

23:58 - Ed  
  Okay, okay.

24:01 - Cody Miles  
  So then my suggestion would be we show this in this screen, business info and contact on both of the onboarding flows.

24:09 - Ed  
  So now I get rid of the facts. So yeah, no one uses the facts. Did you get their business email? Yeah. So because remember, let's say in this world, Samantha, Valerie, is creating Opera of Us. She's the office admin. But everybody is an individual. Now, if we think about what we just did with the vendor type merge, is the vendor type merge, we effectively had everybody consolidated into one business email that the bank can communicate with. So it needs to be one entry point into the system. Yeah. So I think that's essential. Then go to the next one. And so this is where the switch is. So those first ones were the business information. So if I was filling out, let's say I had five appraisers, I would do the first three buttons once, I'd do this five times. Because I have five individual, they share insurance, but they have individual licenses. 100%.

25:24 - Cody Miles  
  My thought was, and I don't think Val's gotten this far, but you would do your profile, and if you're an appraiser, you upload your stuff. But then for setting up your team, you would basically invite them, and then they would upload their own documentation. Like the user could still upload the documentation on behalf of the other appraisers, but we don't have to do that all in the same onboarding flow. We can punt that for a get started step down the road. That's interesting.

25:50 - Ed  
  So what Kodi is optimizing for is rather having people stuck in this form, you kind of exit them as soon as possible, and then you create a lazy mechanism to get people. So you're saying if I have five appraisers, I fill this out, and I click a button to email the other four to go do it themselves? Yeah, that's exactly what you're saying. So because, like, just skip this, just go to the next step. So Sarah pulls out her information. She's also an appraiser, great. And see, this is now a way. Sarah says, who else? Who else needs to do it? So I have to pump in? Well, in this flow, but I think the best way to do this is to say, like, hey, you say, like, oh, I want to just do John. That's his email address. You know, you want to do, you know, Samantha, that's an email address. And you just fill it in, you say next, and then that emails them. So you don't have to upload their document or manage it on their behalf. You just send them the email, think, so that they can upload their own information and finish that individual section. And you're doing this because you don't want one person sitting there for a You need an administrator, yeah, effectively. Yeah, you don't want one person, you know, saying, like, oh, , I didn't get to number six. just say that in their microphone. It went off, I just floated and saved, and I need to log in again. I need to remember where they are. I guess I like that, but I guess if I was the admin person who knows tasks of doing this, I can. So here's the interesting thing. There's a way to complete this after you go through this. Because this is onboarding. This is getting the company registered. Well, couldn't you have a choice right here? Hey, fire off five emails to these people, let them do it, or you do it right now?

27:30 - Cody Miles  
  Well, so it could be either or, but in the onboarding flow, you just get them into the system, and then post-onboarding, there would be a get-started step. would be another series of onboarding steps the user needs to do. So right now, we're trying to ask for the minimum amount of information to set up their account, and we need another user, right? But then there's like a series of steps afterwards where if the profiles aren't complete, we tell them.

27:53 - Ed  
  So at this point, I'm thinking I'm filling out the other team members. I don't know that yet. Got it. Okay, so let's jump. Same thing with coverage, right?

28:05 - Cody Miles  
  Would coverage be on a per-appraiser basis or would it be for the entire company?

28:11 - Ed  
  Typically, it's county-stay. Okay, so if you're doing residential, I need to make a phone call on this one. Sometimes, I don't know if our system can do it based on, hey, you're allowed to appraise houses within a three-mile radius of your office. Oh, is it that granular? Some people do. So I need to get a sundown on that stuff. Because before you had states and counties, why did you put in radius? So this is because you can probably then do some of that, like you said, the radius sense. I think we should probably just merge this experience with the other experience, assuming that it can apply to the entire...

29:00 - Cody Miles  
  Fire company and all appraisers in it. It's just a different experience here than it is in the other flow. So it should just be the same.

29:07 - Ed  
  That's pretty, pretty confident that the coverage would be. So if I had five people, I'd have to consider all their services. So this is the thing that you as a company, won't you say like, as a company, I've got a mission and my mission is that I'm servicing the state of Florida. Right. But if I service the state of Georgia and I've got five people and I've got five offices, I've got Stan that handles Dallas, I've got Steve that handles. Right. Guys, I have to jump. Val can keep going.

29:40 - Cody Miles  
  But whenever you get through this flow, you're going to see there's some get started onboarding stuff that we can work through. The biggest problem is still that we don't have a consolidated experience between these two like account types. So I'm working with Val through that right now to kind of model out how it should go. But ultimately, the way that. I see this going is whenever we add users, we can manage the profile of users, including their documentation. And if we are sales owner appraiser, we can also manage our own profile with our own documentation.

30:11 - Ed  
  So that's the vision for it.

30:13 - Cody Miles  
  And Val can show you what we have so far. Thanks. Thanks, Cody.

30:18 - Ed  
  So I think on that moment, let's just think about it. As a business, let's just create a business statement, which is I'm doing Georgia, which this is. And then we figure out how to do the individuals with the individuals. So let's just run through this. let's just say, OK, this is another thing. Yeah. So skip through this, Val.

30:45 - Val Vinnakota (brandcave.co)  
  Sure. But you are right in understanding that, Ed, that I was thinking like a business would have a coverage area and whichever the vendor comes in. Yeah. They will bring in the specialties. So I haven't added the specialties within the business itself. It kind of depends on the vendors that. Do have?

31:00 - Ed  
  Yeah. So we'll just finish off with the review here. Cool.

31:07 - Val Vinnakota (brandcave.co)  
  Before I show how it looks like, I think I want to quickly show you how the individual user's experience looks first. So we can compare that to... I love the company.

31:20 - Ed  
  So what I wanted to do is, the moment you kind of like logged in, your account is created now. I just didn't want to leave them hanging. So we kind of have this, you know, with the front. So like, hey, listen, you're going to see a dashboard. You're going to see this. Because what I wanted to do is, I want people to come and visit on the site. That's the only way we start thinking about things like community. And so one thing that we'll build for them potentially is this dashboard, where they'll see the flow metrics effectively saying, how long does it take for them for review to be completed? What's the average rating? So let's say I get a new bed and I want to see what I selected last time. Right. If on this, I can say, oh, I bid five times for this bank, this price, I didn't get any of them. That's kind of like the dashboarding that we want to bring into it. Yeah, a reason for them to log in and see what's happening today, not just, oh, I'm waiting for an email. You know, because if we're starting to think about community where we want people to communicate, like if you have a dashboard where, okay, effectively this is the dashboard representing my business, I want to stick on this and see where I'm at today. Yeah, a bit of both. So if get a bid, I want to respond to it and then see the dashboard. Or if want to do community stuff, maybe somebody chatted with me. Yeah. Is it a new URL? No, no, no, it would be in the same one. And I feel like that's where it's powerful, because if I have the dashboard, a reason for you to have this spend on your desktop day-to-day. If you don't have the dashboard, you only have communication, you're just going to rely on being on your inbox. You know, and so that's kind of like we lose out building the community. Cool. Cool. So just, yeah, well, show us what you got. All right. So some simple mortar.

33:00 - Val Vinnakota (brandcave.co)  
  here to explain like what they can expect, what they should be doing, and we are looking at an individual vendor. So getting started, we'll have a temporary page since this is a first-time user that kind of looks at what they need to do. Please ignore the number steps here, that's kind of a wrong logic, but the idea is to prompt the user to say, hey, you haven't finished your profile, so why don't you go ahead and finish that, clicking on which will take them to their profile. And once they finish that, we'll like scroll through other steps and kind of get into, okay, you haven't uploaded the documents, you need to do that. Kind of showing what they need to do to kind of finish the entire onboarding before they actually can use the product. I want to linger on this page for a second for your feedback before I show a fully filled out. So I get these upcoming steps if I didn't properly fill out the first thing?

33:57 - Ed  
  Yeah, so and they might be that... We kind of fast-forward you through so that you can start using it, but it's not complete. done, yeah. Cool.

34:11 - Val Vinnakota (brandcave.co)  
  Let me quickly show you guys how our fill-out profile looks like. So for anyone.

34:19 - Ed  
  Yeah, okay. Yeah, but I think just making sure that it's consistent, yeah, the PowerPoint. Yeah, it's like that image. Oh, this is real.

34:28 - Val Vinnakota (brandcave.co)  
  So right now the dashboard kind of caters to mostly the metrics and, you know, your performance. We haven't introduced the social or the community aspect to it yet. Yeah, perfect.

34:40 - Ed  
  So the landing page is the dashboard for the vendor now.

34:43 - Val Vinnakota (brandcave.co)  
  They can look at how many bits they have done, what's the trend of that, what was the turnaround time, what's the completion rate, and the average rating as well, and whether it has improved over the week or whatever the time is. And quickly, a couple of metric charts that shows them, again, what's the... Turnaround time trend has been and what was the bid acceptance rate versus what was declined over the few months. That's across all the Uconnect clients?

35:10 - Ed  
  Yeah. Okay. Mostly holistic data here.

35:14 - Val Vinnakota (brandcave.co)  
  And some quick section for, you know, like if there's something urgent that they have to address, there's some urgent items due this week, et cetera, they can view all and get to that. And some recent activity that has happened, whether they've accepted a bid, they've submitted the report, or the data message from the bank that they need to address.

35:34 - Ed  
  Yeah. think this is, from this perspective, there's so much more that we can do, but this is such a great kickstart point. What part of that would be community? So community isn't built in yet because we don't know what that looks like yet. Yeah. But what I'm saying is this forms that basis. You know, like there's a reason for you being here. And so there's a reason for me to start creating the connection, the community. that's Bye. So it's one of the things that I kind of think about, an easy way to do that, is to start thinking about the ranking, know, just saying like, Effectively saying that, you're in the top 10%, you know, top 20%, you know, of people in the similar age, you know, similar size or whatever that is, you know, so we can kind of like start creating, you know, buckets. Yeah, because I could see the rating for banks, let's say, you've got five, three bank clients. Yeah. How do you know which one, is that a collective average, is you doing better on this bank or worse on that? Yeah, there's ways for us to break it down, which we'll do, but I think for me, you know, what I'm thinking about is, is from the community perspective, if you start thinking about the ranking, you know, one way that you, the reason why you would want to come back and visit is because I want to know, how am compared to my peers? You know, same and similar size. So if I'm doing like... Let's say Florida and I've got like three states in Florida. I can compare that to other people that does one state or, you know, one province in three states or whatever that is. And so you could go and say like, oh, you're in the top 10 percentile because you've got a 4.7 or you're in the bottom 50 percentile and then have people, oh, I need to change something because I want to whip, you know, I want to kind of like get to that next level. And so there's a lot of ways for us to just look at the ranking as a way to start building community within without having network effects because you build community with people similar and same first and then you build community with the opposing force, which is the vendor. see what I'm saying? Yeah, are we going to tag it into the workflow to where at the very end of the process, the interaction between the reviewer and the appraiser, that's where the radius. Yes, yeah, yeah, exactly. So at the end, the reviewer is going to have to say four stars. Four stars, yeah, exactly. Yeah, so that's tight end. But the reason why I'm doing the ranking, why that is so important to me right now, like the internal community, it's because I need these guys to use AR review forms, auto review. You know, and the way you do auto review is because now that number suddenly matters because I want to be number one. You know, I don't want to be in the top 50%. Well, I had this idea that I'm the best. So, hey, AR review. Yeah, exactly. So now you kind of like do a call to action because now when you present a thing is we could say like people that do auto review has a 20% better, you know. Yeah, cool. All right.

38:44 - Val Vinnakota (brandcave.co)  
  So before I quickly show you the other pages, want to show some quality of life elements here, like quick notifications they can look at. Ready to change the theme from dark to light. Yes. So maybe let's just do it. The dark thing for that stuff, the demo. Yeah. So whatever we had previously on the vendor circle, on the vendor side, we have slightly changed the words, the language here. And so my request, I'm going to just try and call it my work, where users will be able to see their bids and the reports that they have submitted. And they're all with the different statuses, like whether they're bids needed, they're submitted, that needs their confirmation. They can apply the filters and filter through that. They can change for all statuses. And they can obviously look at individual bid, but I don't have the IA for that, so it's kind of empty. And the other aspect is if the vendor gets invites from the banks, we have a separate page dedicated for them that shows the invites briefly as from which bank, the logo. When it was invited, whether they are new. And for example, if the bank has an expiry date, we'll show that it's going to expire in a few days. So address that. They can look at more information where if the bank has provided why they want this bid in any form of communication, we'll show that as the footnote here along with some scope and the region of work and who's the contactor essentially and what was the address of the bank or the contactor was. User can accept that or they can reject giving some reason. So that would be careful.

40:38 - Ed  
  Val, this invite is specifically an invitation to bid. Is that what you're thinking?

40:48 - Val Vinnakota (brandcave.co)  
  It is for connect with the vendor, not exactly a bid. Oh, okay. Because they can't send in bids on the connect.

40:55 - Ed  
  So this is when, um, that. Well, it's thinking of when the bank wants to add you to their preferred vendor list. That's why it's new. Yeah. Like I'm not on their list. Yeah. They're considering me. They're considering me. And so they kind of like send out an invite. That's an interesting idea. So he's separating the everyday bids from those. Yeah. What do you think about that? That value? I think the everyday bids is a nice UX. Because how do you see the everyday bids, right? Like do you see them? There's a pool of things floating around. It's an email with a PDF attachment. They give you some description. Yeah. You click on bid or something. Yeah. It takes you to a screen of dozen fields. Enough information to figure out how to bid. You put in a price, time frame, comments. That's about it. Real easy. So how does the bank normally choose, because they have all of your proper information, so they see. So there's a due date, okay, we're sending out the bid, you don't know how many bids you're sending it to, you know they typically give you a day or two or three to respond to it, they don't sell it if you got, some banks email you back and you did not get it, most you don't know, which is hard to report. If you did a bunch of jobs, you don't know if you got it, then when you get the job, you get another UX, you download these documents. The UX is very nice on that, it's very straightforward. Sure, yeah, I mean. I wouldn't want to go, there's some competing products, they're not great products, but where you have to log in to accept and you've got to move around, it's confusing to, you do everything on this dashboard. You bid on the dashboard, you accept on the dashboard, it seems old school. So what I'm just hearing is that you think like, you know, because betting is a connection to the bank. the moment you kind of like go through the bidding process, you are effectively on the vendor list of the bank, right? Yeah. So to me, there's an auto-envolvement, like there's really no need for inexplicable invitation. I would if I got invited to, let's say I've never done work for SunTrust. Yeah. I would, that makes sense to accept it through this portal. So meaning that. day, I don't think we should go through there. Okay. I mean, I know you're trying to invite community. Yeah, no, it's just that the, are we unpacking the bidding process? Do we want that to be part of what we are doing? what doing? Do Do You Do we want to have a section here that says, yeah, you know, everyday bids? And you, you know, we just don't push that in. Because that seems to be the biggest part of this business. It definitely gets them going to the site. And it will go because that's their bid. So, yeah. Okay. Val, we need to just think about that, the bidding part. It's not a B1 thing. It's definitely a B2 thing. But, yeah, let's just keep on going and see where we end up. All right.

44:44 - Val Vinnakota (brandcave.co)  
  So the other aspect of the vendor is the credentials. Essentially, I'm calling it documents. This is where they would be able to upload, change, or edit the W9, the resume. And some of the sample reports that they have for the bank to obviously see.

44:59 - Ed  
  So, So, Yeah, that's good.

45:04 - Val Vinnakota (brandcave.co)  
  Same goes with the state licenses, and this is where I wanted to add this quality of life feature where some of the license expiring, you'll get a notification. They can go ahead and either delete it or, you know, like edit it with the latest license.

45:18 - Ed  
  Let's say the license expires to send emails to our client already. Yeah, we can not figure all of that. It's really up to them. Yeah. Yeah, should they really have to babysit them? Because the system's going to tell them something's out of date. Right now, the clients have to manually. When they upload their license and it doesn't confirm, so the bank has to manually look at their license and see if it really is 2026. Right. that something that we wanted to do? No, it's very much different. But it wouldn't be super much effort if it's just about like. I mean, in a perfect world, you'd upload them and it would be criminal checks. couple yes. a good Great. That's Yeah. Confirm with the state that they're actually licensed through the state, not a PDF that they directly, I hope they're being truthful. Yeah, but that's not our responsibility, it's system. I wouldn't spend money on that. I'd give back to the community part, just to be chat about it. I'll show you the GUI. Sure. Okay, so this is Greg, Val. What's the difference between this one and the company one?

46:28 - Val Vinnakota (brandcave.co)  
  Yeah, that's something we are still working on, Ed. We don't have much difference at the moment. Let me quickly show what we have on the company side. But before I move on, here's something you can see on the profile. There are addresses, there's some coverage and expertise. I just want to add to what Jeff has mentioned before, like when we want to add coverage. Yeah, we now have the state selector and all the counties that belong to that state, open up. Okay.

47:01 - Ed  
  Yeah, yeah, we just need to match this one.

47:05 - Val Vinnakota (brandcave.co)  
  Yeah, so similar experience you could expect on the onboarding as well. Yeah. And, yeah, so if they were connected to a bank that they know they're going to get bids from, this is the place that they know. These are the banks that they're connected to. And, again, some quality of life for the app settings itself where they can enable certain notifications, have their language preferences, time zone references, and ultimately to be able to deactivate their account if they want to.

47:37 - Ed  
  Yeah. Is there anything else that we need to look at?

47:42 - Val Vinnakota (brandcave.co)  
  Well, there's a team section where if you're not an individual user, you get the ability to add more team members. And you can kind of see the table of the teams, invite a new member from here. This is where it will start. Thank How to transform into a business kind of an account. Yeah. Let me quickly show how it looks on the business side. That's cool. So on the business end, a few changes here. We not only want to see the work or the performance of the business, but they're also going to see the team performance here. See, this is where I feel it becomes really powerful. And if there's any active work by some of the members of the team, anything from them? I wonder how you identify. I mean, it's a great idea.

48:40 - Ed  
  So typically on a report, like all, I don't know, you have multiple appraisers signing it. You got the boss signing it and the appraiser. I wonder how you separate, I guess you know, they did the appraisal. Yeah, think you would have an association with, like, it came from the accounts, you know, at this timestamp. And they... Moved into the next workflow, you know, so you should be able to track.

49:11 - Val Vinnakota (brandcave.co)  
  Rester, at the moment, is the same, other than the team members are now filled in with different kind of roles. That user can either, I mean, if you are an admin user, you can change their roles or preferences here or view their profile. Cool.

49:26 - Ed  
  Yeah, if the filled out, we'll see that, if aren't filled out, they can send in a prompt. So the office manager can essentially make sure that they are. just want to ask you something. If we think about, we want to roll out, let's say, mid-fet, you know, end-of-fet, what do we need to start delivering to the team to finish? Like, you look at where Jason is, with his version of this, you know, we need to wrap this up into a deliverable product. What do you I it's the minimum viable product. You can keep the UX of the dead end, right? Jason's version? Yeah. If that's what you're saying, it's the finish line. Yeah, yeah. What do we need to do to get to the finish line? They just want to look at it? Yeah. What do you want to keep from here? What do you want to... What do we need to start pushing over that fence so that we can start looking? What do they need to do in their statements? Well, I mean, we need to build an ongoing close, finalize them. We need to figure out individuals as a company. You mean taking the existing company into this? Yeah, because, I mean, if we want to roll up in a circle, right, you know, and we want to present in a circle as a product, you know, that we have, we need to have the ability to create new people and the ability to manage the people we already have. And so we need an onboarding product, you know, that's, that's just basics. So... So... We need onboarding flow. We need to figure out differences between organizations and individuals. But if you look at functionality here, you know, my work, invites, documents, what is it that you feel is the minimum viable product that we need to present to Jason so that we can start building this into Vendor Circle? Is all of this, or is there something missing, or is there... That was plenty of time to go. So you would say all of this, what's in here, is what's needed for Jason to complete Minnesota. Like this UI UX that we presented over here is a more finalized product than what Jason has presented. And you're separating the... I haven't seen what Jason's talking about today. Yeah. I mean, it's nothing. It looks exactly the same as the last thing. There's no change. You're saying keep the UX, the actual bid, or is this going to be the bid like until here it's actually bid? Now we can say... say... Now We could say, I don't know what it looks like, so I don't know what it looks like, but I think to answer your question, that would check all the boxes of, let's get this out. Okay, so if we have that end of it, we would be effectively golden, that's what you're saying. And then the, from the person internally with the bank, the question would be, I work for South State, how do I interact, do I get that UX? So let me switch over, now I've got to confirm the licenses, do I interplay with this? is what it looks like, this is, this is the development site, right? So, how does, how does this ugly version, I don't know what the back's like, I haven't seen the back's like. Well, it's going to be something like this, it's just a, it's just a sugar version of, it doesn't look like this. yes, I haven't. So given this other time, can you have that other pretty UX, how do you, I don't know what Jason's doing for the of the hard time, you're just going to throw that away? Jason's thing? Yeah. So you throw away Jason's. So that's the thing we need to, I need to effectively, because Jason said he's got the ability to create that, and I'm like, okay, it's fine, I can use you as a resource. But then, you know, here's exactly what I need to look like. Like, I need to tell Jason. You need to tell Jason to read free all of us all to be the software. Yeah. Do you think I need to do it now?

53:40 - Val Vinnakota (brandcave.co)  
  I mean, like, Ed and we discussed that, whatever you're seeing here, Jeff, is pretty much done on Next.js, on Tailwind CSS, so it's almost like 80, 75% production ready code. It it would be easy for a developer to take this and move forward from there.

53:59 - Ed  
  Well, well, If we can give the code to Jason, he can make a difference. Jason doesn't have the skills to develop in this language. So it's not about like, we can make the look and feel like this, but Jason would need to do that in PHP. What's the point of doing that? It's just going to be happening. Well, that's where I'm at. You see, you know, we need to make a decision. Okay, that's the technology we can talk about. I'm just, I'm just, I just need to get sign-up from you that this is what we need could see somebody spending money on this, but not Jason's focal point. Because the other one is just what they have now. Yeah, exactly. That's the point. Yeah, there's nothing there. That's why, that's why I'm right now, you're not going to make money out of this time. Unless there's something like community. Yeah, yeah. No, is horrible. mean, that doesn't even align. That's just basic. Yeah, that's how it works, yeah. Any case. So what do we do with these new ones? If you are happy that Val has completed all the modules that's needed for us to successfully deliver. There's a little nuances we talked about. There's a little nuances that we delivered. Then I need to kick this off as a project as soon as possible. So who's going to make it, go to make a PHP? No, think what we'll do is, what I'll do is, I'll have Jason convert everything that he has in an API. You know, and then just do the connector from the front. Thank you all, be sure you do that. Okay. Thanks all. Thanks for your time, bud. Thank you. Thank you all.

55:45 - Val Vinnakota (brandcave.co)  
  Bye-bye. See you. Bye.

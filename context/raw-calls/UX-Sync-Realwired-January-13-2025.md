"UX Sync | Realwired - January 13
VIEW RECORDING - 37 mins (No highlights): https://fathom.video/share/68NP8k1JxdTUbdJtafxzKdzvbkSDxhpM

---

0:19 - Edward Kruger (Realwired)
  I just read that Mattel has launched an autistic gourmet as part of the collection. What's the toy?

0:33 - Val Vinnakota (brandcave.co)
  An autistic? Yeah, autistic Barbie.

0:37 - Edward Kruger (Realwired)
  Autistic Barbie.

0:39 - Val Vinnakota (brandcave.co)
  Yeah, yeah.

0:40 - Edward Kruger (Realwired)
  Isn't that interesting?

0:43 - Val Vinnakota (brandcave.co)
  I'm curious. How would they visually depict autism?

0:47 - Edward Kruger (Realwired)
  Yeah, that's actually a fascinating question. Yeah, how would they do that? Let's see. Yeah, how do they know? Oh, if you look at it.  The eye, she doesn't look directly at you. She kind of looks slightly to the gaze. Oh, wow. That's a subtle little.  Yeah.

1:11 - Cody Miles
  What? Yeah.

1:13 - Edward Kruger (Realwired)
  Wow. They also have a Barbie that's blind. Oh, you're talking about autistic Barbie.

1:23 - Cody Miles
  Yeah. Have you read it? I saw something about it yesterday, but I hadn't looked at it. Interesting.

1:36 - Edward Kruger (Realwired)
  Oh, that's interesting. They also kind of like made it sort of the hand motions that you can make. It's kind of like limited to, you know, some of the hand motions of autistic people.  That's really interesting. And then she wears noise-canceling headphones. Oh, that's fascinating. Well, good for them. You know, really interesting.  It is super interesting. Yeah. I don't know if you say progress. I don't know what you say in these moments, but whatever the word is.

2:14 - Cody Miles
  Yeah. You know, make someone feel seen.

2:23 - Edward Kruger (Realwired)
  Yeah, that's it, man. That's all it is, man. If it includes, gets more people included, then by all means, let's go.  Walls to the walls. Sorry, I'm like, I'm limited to basic vocabulary. That was the technical term, I think, walls to the wall.

2:50 - Cody Miles
  Yeah, yeah.

2:52 - Edward Kruger (Realwired)
  Thanks, Notaker. That's, that's, uh, do they blow  like that out? Like, they, what do they do when you swear?  I do.

3:00 - Cody Miles
  No, they don't. I do think Fathom should have a redaction feature where you can say, either post-meeting or during the meeting, cut that part out.

3:12 - Edward Kruger (Realwired)
  So if we were to talk about abducting people, what happens to Fathom? I think there's a lot of use cases that need to explore.  Totally.

3:27 - Cody Miles
  But the day Fathom gets hacked, this will be the last you hear of me. I mean, I'm straight to jail.

3:38 - Edward Kruger (Realwired)
  Yeah, I hear you. So fun. Okay, let's go, Val. Yep. Okay.

3:44 - Cody Miles
  So we have, again, some early mock-ups as Val's figuring out the functional requirements here. I met with him earlier, and the direction he's going is closer to, I think, what you're envisioning, but I have a slightly different vision.  And so we'll call that out as we're going. Thank And through this, but maybe you can help us validate this too.  So we'll kind of go through the create account flow and I'll call out the big thing when we get there.  Yeah.

4:16 - Edward Kruger (Realwired)
  All right.

4:17 - Val Vinnakota (brandcave.co)
  So what I'm going to show right now is the creating a new account.

4:24 - Edward Kruger (Realwired)
  Yeah. The boring stuff, man.

4:29 - Cody Miles
  Fair enough.
  ACTION ITEM: Update onboarding: remove account type; add welcome; skip; dashboard 'Get Started'; page modals; remove guided tour - WATCH: https://fathom.video/share/68NP8k1JxdTUbdJtafxzKdzvbkSDxhpM?timestamp=272.9999

4:34 - Val Vinnakota (brandcave.co)
  So I'm just simulating an experience of how they can refer on email.

4:38 - Edward Kruger (Realwired)
  I love that. Good. This is the change. Oh, see.

4:43 - Cody Miles
  I am not convinced there needs to be any form of a concept of account type. I think it could just be the same account serves everyone.  And whether or not you add more than one appraiser profile is kind of up to you. But that's worth validating with you.

5:02 - Edward Kruger (Realwired)
  Yeah, this just seems like friction. Yeah. Yeah, this just feels like now, Sonia, I have to decide I'm a one-man business.  Does that mean I'm a desk? No.

5:15 - Cody Miles
  Nope. Yeah, I'm with you, Cody.

5:18 - Edward Kruger (Realwired)
  Yeah. Okay, but what does it look like when we're on the inside? Is it the same? It's not the same.

5:25 - Val Vinnakota (brandcave.co)
  Yeah, it is not the same. Let me quickly show you the individual appriser, which we are already aligned on.  Yeah, yeah, yeah, we know this one. The first time I count, we start with an onboarding phase where user would be prompted to give their information, such as basic information, their contact details, and at least one set of their licenses.  Moving on to at least one set of their coverage area or just start doing that. But they can skip that at any point of time just so that we have some information to fill it in.  The special piece where they could select some of them, add their designations, and finally review what they have done.  And this is the idea where you said we really need the user to set up their profile before even product.

6:16 - Edward Kruger (Realwired)
  Yeah, this is, so on that, Val, you, you know, when you do account setups in those ways and your data skips, you have to, you have to manage a couple of things.  So you have to manage abandoned flows, you have to manage half flows. Yeah, that's right. So a kind of way that I, that I've seen, I don't know if this is the best practice, but something that I've seen is, is if you do it that way, we kind of want to prompt it for the first time, the first time only, then have them know it's only going to take them five minutes and what they will gain after they've finished it.  You know, so there's a reason for them to kind of go and grab all of the documentation. And they,  And the other thing is, is if you kind of like skip it and, you know, you don't want to go, you just want to see what the app is like, you know, before you decide to fill in that information, you have to kind of like land them on a dashboard flow where you can see like your profile has only been completed 5%, you know?  Right, right. Yeah, yeah, yeah. So just keep in mind that balance flows is a nightmare to manage if you only do it once in the process.

7:29 - Cody Miles
  My preference would be if they, you know, abandon the flow, but then they log in on a subsequent time that we would just be in a state where they have to complete the onboarding flow before they can get to the dashboard in order to kind of collect all the basic settings of the account.

7:44 - Edward Kruger (Realwired)
  Yeah, the thing is, is just what you're effectively doing is, is you're preventing them with the same experience they have where there's a paywall, they don't get to see what it is that they are getting into.  And so there's this anxiety and frustration with the problem. product at that stage, oh  it, you know, that's what they feel, so I'm super happy with having that flow kind of like set up for them, but because I do want them to onboard and I do want this onboard to be successful and easy and simple and all of that stuff, but when you get hit by the paywall every single time before you get into the system, it's just, it's just like, these guys are, they  hate being on here in the beginning, man.  You know, so, so now you're adding a little bit more of that friction. They're not, they're not cool kids of the, you know, the new generation, they're all white guys, you know, they don't use a computer to do this, so I, I, I love, I do think the flow is good, we need the flow, but I think like having the flow in a dashboard section or like, you know, a landing section is probably the best way to do it.

9:01 - Cody Miles
  Makes sense? Yeah, it does make sense. Totally get it.

9:06 - Edward Kruger (Realwired)
  Sorry, just to make sure.

9:08 - Cody Miles
  I said it makes sense and then I thought about it some more. As an initial flow, it still makes sense to have this.  It's totally skippable.

9:17 - Edward Kruger (Realwired)
  yeah. Initial flow, absolutely. And then what I would just do for the initial flow is, first stage is, hey, you know, why can't we be so stoked that you are here?  Yeah. You know, this is going to take you five minutes to fill in. We're going to ask you six different questions.  You know, get your paperwork ready after this. You'll be able to explore. Remember, you can skip this at any time and come back to it.  You know, yada, yada, yada. Let's just remove that with a welcome message and a little bit of a celebration.  Totally.

9:49 - Cody Miles
  And then following completion of this or skipping it, there should be a onboarding section of the dashboard where we kind of see either their profile is incomplete and or they're  They're next steps.

10:00 - Edward Kruger (Realwired)
  So I have plenty of patterns for that, Val. You got it.

10:05 - Val Vinnakota (brandcave.co)
  Sounds good, Kerry. Okay. I'm sorry, I just abandoned that flow, but there's some machines, they would land on their app, but we would start with a guided tour just to make sure the user knows what the things are.  I mean, also guiding them to something they haven't filled before, such as showing them, I mean, this is just a little demo, but we would actually get into the page.

10:30 - Cody Miles
  And by the way, I've already made some comments to Val already about how this should change. Okay, cool.

10:38 - Edward Kruger (Realwired)
  Yeah. Yeah. I like the, I mean, the guided tour is good. I, you know, I love the guided tour.  I think it's an easy way. How do you access it? show me, Kukin.

10:51 - Val Vinnakota (brandcave.co)
  I'm sorry. How do you access the guided tour?

10:54 - Edward Kruger (Realwired)
  Do you press the little help? Oh, yeah. Yeah. It would be, for the first time you say, it would all.  Yeah.

11:00 - Val Vinnakota (brandcave.co)
  They'll always be available on landing, but at any point of time, they can click on this and ask for a product tour.  Are there other options as well, like documentation, support?

11:13 - Edward Kruger (Realwired)
  Yeah, so I think, like, you just did an onboarding flow, and now you're doing a guided tour. So it's like, again, man, it's maybe too many walls.  What I would suggest is just, you know, once you go through the onboarding page and you hit this first, maybe just do a cool animation, you know, around the, you know, the question mark, just to say, like, hey, something cool is happening here, and have them explore and discover it, you know, yeah.  But in any case, that's subtle. We can fix that after that. I totally agree.

11:52 - Cody Miles
  So in, in, also in a world where we add the, like, get started, um, onboarding section, that's like, they didn't, the profile is that, like, that.  serves all of the need. And then minimally what you could do is if they go to a page for the first time, you serve an education modal on what the page is, but you don't have to do an in-app product tour.  But you don't have to do it on the dashboard right after completing the onboarding flow because the get started section will serve that.  Yeah. Awesome.

12:23 - Val Vinnakota (brandcave.co)
  All right. Okay. And the rest is the same that we had previously, right?

12:27 - Edward Kruger (Realwired)
  Nothing. Yes. It's just starting.

12:30 - Val Vinnakota (brandcave.co)
  So everything is null right now. But yeah. Yeah.

12:33 - Edward Kruger (Realwired)
  So my invite shows seven, but it's just a bug.

12:40 - Val Vinnakota (brandcave.co)
  Yeah.

12:42 - Edward Kruger (Realwired)
  A bug in the UI. Okay. So what does the company one look like?

12:49 - Val Vinnakota (brandcave.co)
  Oh, yeah. So, I mean, before I get into that, let me quickly show you what real-wide admin page also looks like.  No, actually.

12:59 - Cody Miles
  No, Unless you have a great reason, I think it makes a ton of sense just to go into the business admin flow.  Fair enough.

13:09 - Val Vinnakota (brandcave.co)
  I figured that's a small section, so I just show it off. So for the business admin, again, for the starting user, they'll have...

13:23 - Edward Kruger (Realwired)
  Yeah, boring stuff, dude. Skip, skip, skip. Okay, cool. So we'll start with a similar onboarding pattern, but we'll start to collect the business information itself.

13:48 - Cody Miles
  And the contact users for the business, the website address, etc.

13:52 - Val Vinnakota (brandcave.co)
  And of course, whoever is the admin will start to build his profile. We'll give the option to see if they are also an appraiser or...  They're going to be an admin role itself. Okay. And these are the patterns I'm still working on, and this is where they'll try to set up their team, select the size of the team.  And my hope was, of course, we could have just let them have whatever the team size they want, but I figured they might be given, depending on what kind of a tier of subscription.  The seating management, yeah, okay, gotcha. And among their team, there might be non-appraisals itself, so I just wanted to make sure that they select the type of appraisals.  And again, here is where the tier system provides them to how many maximum appraisals they could set up, the profile for the business.  And again, like the business area itself, what is the coverage, the radius, distances, and which could take them to the dashboard itself.  right. And this is where I kind of deviated from what we have from the regular single vendor itself, where instead of just getting into their requests, I thought maybe it makes sense to have a business dashboard.  Of course, they will have a guided tour. Yeah, I like that. But the business dashboard shows them like how many team profiles have been completed.  If there were zero, they'll say, hey, there are so many profiles that have been completed. We'll show them some team members metrics, et cetera.  I'll real quick show you how the filled out looks like, but the idea is we'll start with an empty state of several aspects, empty team message.
  ACTION ITEM: Revise dashboards: move key metrics up; add charts; add state/license map; add invites; remove team chat - WATCH: https://fathom.video/share/68NP8k1JxdTUbdJtafxzKdzvbkSDxhpM?timestamp=928.9999  Real quick, before you go on, Val, I just want to talk about this dashboard.

15:39 - Cody Miles
  So this page in our next version should have an onboarding section in our notes. I've provided some design references for you to go off of.  And then because we need to consider that the actual experience that we should be optimizing for is a single user experience where someone could either be a single appraiser or they could be a business admin.  And of multiple appraisers, what does that dashboard look like then when you're not optimizing for one or the other, right?  Like you're showing appraiser profiles and team members here as counts and metric cards. I don't think that is necessary even if you're a business admin, right?  What you might start showing is like number of bids, connected banks.

16:22 - Edward Kruger (Realwired)
  understand. Now you're talking, now you're talking of, yeah, now you're bringing me back into the, you know, that's for conversation, yeah.  Right, right.

16:32 - Cody Miles
  So do you see what I'm saying, Val? Like the information you're showing here, it's not even valuable to the business admin, but we also need to consider what does a less opinionated version look like?

16:45 - Val Vinnakota (brandcave.co)
  Okay. So in that case, let me just show the filled out version of this. Oh, you have a different state.

16:56 - Cody Miles
  Okay. You can... Also, just tell me to shut up. I have more to show you, Cody.

17:05 - Val Vinnakota (brandcave.co)
  It's more of the same, but let me sign in and demo with that.

17:18 - Cody Miles
  Yeah. It's more of the same. I mean, yeah, this is a great settings pitch.

17:23 - Edward Kruger (Realwired)
  This is a phenomenal settings pitch, or whatever. But to Cody's point, what I want to know is I want a business I'm doing.  I don't know how many licenses I'm using.

17:32 - Cody Miles
  Yeah, like ratings and, you know, aggregate rating.

17:38 - Edward Kruger (Realwired)
  Yeah, what's late? How long does it take to turn around? Who's stuck? Who should I whack with a stick?  You know, who's doing the most work? Oh, yeah.

17:51 - Val Vinnakota (brandcave.co)
  Totally makes sense. I was trying to play along with some of those metrics.

17:55 - Edward Kruger (Realwired)
  Yeah, that stuff is great, but, you know, hiding it on the bottom, you know, that's... You're You're in bottom.  You're bottom. Thank I'll bring that into the top.

18:03 - Val Vinnakota (brandcave.co)
  I kind of want to introduce some charts as well. So yeah, team overview stuff. And within the teams itself, this is where they could manage their teams.

18:14 - Edward Kruger (Realwired)
  Yeah, easy.

18:16 - Val Vinnakota (brandcave.co)
  Invite new members if they want to invite more into their team.

18:22 - Cody Miles
  Here's something to consider from like an IA perspective, Val. And I'm only, I wish I would have said this earlier.  just wasn't thinking about it until now. I would put my, from your main nav being a left sideboard nav, I would put your main actions that we want for the user dashboard or reporting or whatever, you know, profile management, messages, invites, which is obviously a missing item at the top of your nav.  But then bottom of the nav, you can separate, you know, the two sections. Like you have all your settings, like team and business settings.  So like the menu items that are going to be less frequently used, we put at the bottom of the main nav.  Okay. So, gotcha. Like, I'll adjust that hierarchy, for sure.

19:06 - Val Vinnakota (brandcave.co)
  Cool.

19:07 - Cody Miles
  And then, you can look at specretary as an example of that.

19:15 - Edward Kruger (Realwired)
  Okay. Yeah, this is cool. I like it. Place the profiles.

19:22 - Val Vinnakota (brandcave.co)
  Some simple metric cards. And this is where they would be able to see their appraisers themselves, either in a table view or in the tiled card view.  They'll see there some of the metrics. Like, I'm still trying to figure out what makes sense here, but this is a feature from them to have completed their setup if they are fully set up.  If not, they'll see not 100% progress on that. They'll be able to manage their profiles, etc. Add new profile.  And one more thing I thought, like, the business admin would want is a communication channel within their team. team members, basically where they would start to help messages or conversations with their team members.  Interesting.

20:08 - Edward Kruger (Realwired)
  Yeah, I, you know, in the world of themes and slacks and whatever, to duplicate this on a profile, I'm not quite sure if...  Right. Yeah. Yeah. I mean, that's just added, added complexity in the system. I'm not trying to build a HR information.  Right.

20:29 - Cody Miles
  Right. Yeah. And I mean, maybe I could see it valuable if we were able to do some object associations, but I just, I don't, you know, Val, that your main use case will be like probably the single appraiser.  And, you know, I don't know what the percent would be, but even for the business admins, messaging in here just doesn't, I don't see it making sense.

20:50 - Edward Kruger (Realwired)
  No, it's, it's, it's like a lot of complexity, like to keep alive in the back and then to manage and to maintain for something that, know.  Yeah. That.

21:00 - Val Vinnakota (brandcave.co)
  Would you think if I could leverage this feature as a communication challenge between a single appraiser and banks? Would that make sense?  But they have to post through the order.

21:10 - Cody Miles
  Yeah, yeah. It needs to go through the order because you're not allowed to contact them directly.

21:14 - Edward Kruger (Realwired)
  It's against the law. Because otherwise I can phone you and say like, hey, are you willing to do a job for $2,000 for me?  You know, and then, but I need you to say that this thing is only 10 square feet and I'll pay you.  So, yeah, so that communication between those two entities other than through the appraisal, you know, appraisal report through the orders is not allowed.  It's not legal.

21:42 - Cody Miles
  I could see, and this is entirely different, but I'm looking at a chat and I'm thinking of like natural language and LLMs and MCP servers.  Is there any value, because like MCPs are so easy to set up where, you know, they were able to ask questions about their account or orders or whatever.  You can get a natural language response.

22:03 - Edward Kruger (Realwired)
  I think you're talking about a lot of the engagement that I do want to drive, but it's not maybe off of version one.  Like, for version one, I need to get this up and running, you know, and just get the flow. So I think, like, let's reduce the complexity.  We enable, you know, the management, because this is the biggest part. We need people on this platform. We have a call start problem.  We need people on this platform, and then we need banks on the other side, and we need these two people to kind of, like, start utilizing it.  And so the big thing for us here is now that we're doing the conversion here, you know, how did that, that plays into the, you know, representation that Venus Circle has.  Yeah.

22:44 - Cody Miles
  Right. Okay. Fair enough. I can see it being way more valuable for the bank anyway.

22:50 - Edward Kruger (Realwired)
  Yeah. Yeah. Yeah. That's the thing. These guys, like I said, it's all guys that work with emails, man, you know, and have set up.  In their ways is going to be really, really, really hard. I think what we need to do is we need to give them a taste of simplicity and less friction and enable them to see more insights because that's what we're trying to do.  We're trying to be a company that provides you insights, so having your dashboards, understanding your flow, getting clarity on your rates and things like that.  And then when we are there and the utilization is high, we start investing in community, which would be messaging and, you know, all kinds of fun things like that.  Yeah, totally. Okay, so just to be clear, yeah, Val, like on the team side, I can create a profile on behalf of a different appraisers?

23:43 - Val Vinnakota (brandcave.co)
  Correct. Okay, cool.

23:45 - Edward Kruger (Realwired)
  And then they would have a magic link that allows them to sign into the site and do whatever they need to do?  Right.

23:51 - Cody Miles
  Well, I think that, so here's how my brain wants to do it, but I think it could be wrong too.  So. Just challenge me on this. Users and profiles don't have to be the same thing. I could have just a business admin who's just managing profiles, and the profile doesn't have to be tied to a user.  But maybe that's a bad move. Maybe the profile always is another appraiser.

24:19 - Edward Kruger (Realwired)
  A user is always an appraiser.

24:22 - Cody Miles
  That's an interesting question.

24:24 - Edward Kruger (Realwired)
  Why would I add a user that's not an appraiser? Like, the business admin isn't necessarily an appraiser. But it...

24:34 - Cody Miles
  So... If we decide to tie appraiser profiles to the user, then we can consolidate too many items.

24:42 - Edward Kruger (Realwired)
  So, because what I'm just thinking is, again, reducing the friction here. Will we create one, then we would need to add this other one.  Yeah, that's true.

25:01 - Cody Miles
  Is there any reason there would be an appraiser profile in my account that a user isn't related to? Like I'd have an appraiser profile.

25:10 - Edward Kruger (Realwired)
  I mean, honestly, I can't see it in version one just purely because the only use case I have is do the job.  You know, just log in and do the job and, you know, push the appraisal through. So it's hard for me to see anyone else use it.  But in a future world where we are suddenly talking about metrics and community, it suddenly makes a little bit more sense.  But this future world is not three months away. It's maybe less, you know, so I'm like, do we want to create that complexity then, design for it now?  I think we create it then. Like, I want to reduce friction to get these guys on board in the easiest way possible.  So maybe we should just combine. Yeah. Yeah. Okay. Sounds good. So a couple of questions.

26:01 - Cody Miles
  When I add a user and I, you know, basically I think that I see this as a user role, then their user role of appraiser.  And with that role is going to come the necessary inputs of completing their profile. Do you see that as something the business admin sets on behalf of them or that they can invite it and then they kind of complete their own profile?  I can see both happening.

26:26 - Edward Kruger (Realwired)
  I can see like, John, I've created your profile, just log in and follow the flow. And I can see I'm responsible for everybody's licenses and I have all of that information.  So let me do it on behalf of them. Because remember, like your business profile is your individual appraiser profile.  So if you've got one appraiser that's an appraiser in Atlanta, like that's the capability of your business. You know, your business needs, it doesn't have its own license.  The individuals have licenses. It's just contracted through the business. And so it bubbles up. Right, right.

27:05 - Cody Miles
  So Val, that makes me think in the initial onboarding flow, and I think you have this, but we just have to make it.  It's a really important input when the business admin is creating the account and we ask them, are you an appraiser that forks the onboarding path, right?  If they themselves are an appraiser, we probably have them complete their profile in addition to potentially adding other users and, you know, kind of getting them set up.  Or if they're just a business admin, then we just take them through something more similar to what you currently have.  Does make sense?

27:41 - Edward Kruger (Realwired)
  Cody, it's an interesting product question for you, but, you know, let's say I've got 10 people that are working in my business, right?  And I'm the person that's setting up my account. Now I want to set up this account so that we can, you know, get the ball rolling.  But I just now, you know, shared with you the complexity that, you know, the licensing is effectively bubbled up, right?  You know, that's...-hmm. I'm thinking that in terms of, like, it would be really frustrating for me when I'm setting up an account and I want to complete this profile, but now I have to load every, you know, to 10 people that's working for me.  Right. I'm wondering, you know, if, can I just upload the licenses, tick the boxes, you know, get the state approval, and then the business is operational, but then the person who does the job or gets it assigned to, you know, or whatever that flow is, you know, I can add on later?  Mm-hmm. You see what I'm saying?

28:48 - Cody Miles
  Well, I see the need of wanting to reduce the friction, especially in an onboarding flow where you're adding the rest of the team.  The way that I would see it in that initial onboarding flow, it could be if we wanted to... Take an approach where you upload a license and we try to parse the information and add the user.  The other path, probably the more simple path, is just there's a minimum set of inputs that are required for inviting the user in that onboarding flow, like name and email or whatever, and user role.  And then when they accept their invite, they complete their profile on their own behalf. And or when the user finishes the initial onboarding flow, we see in the get started section, you know, what profiles are left to be completed.  And we just try to gamify it.

29:32 - Edward Kruger (Realwired)
  Yeah, yeah. Because what I'm just thinking is, is I want this business operational so that someone can, so that they can bid on a job and actually, you know, complete that job.  And so I'm thinking of that bidding process, you know, I want to be able to say that I can do, you know, work in Indiana and I can do work in Chicago.  And so now I, let's say I win the Chicago, well, my firm won the Chicago work, you know, how the firm ends up.  Delicating it to that person, you know, there's a moral and social responsibility that their license is up to date, absolutely, but I'm going to email things to the firm and the firm is going to automatically route that to the person with the, you know, appropriate, you know, license, whatever that is.  You know, it's going to sit in a queue until it gets kind of like activated and if that person responds, you know, to it, they are effectively responding as an officer of the business, so they'll respond on behalf of the business, you know, and send it through.  So even if they get a message, you know, through the individual platform, it will, it will be, it wouldn't be, you know, on the business side, the business wouldn't be saying that John said this, business would be saying that company X sent this.  Right. So I'm just wondering, like, you know, from that perspective. Like, the onboarding flow does seem to have, like, there seems to be this interesting thing between licenses being a separate concept, even though the appraiser has the license, the business owns the right to it, or, you know, what, yeah, because I, maybe I set up the business first, and then I worry about, like, completing the people profile so that they can learn.

31:30 - Cody Miles
  Okay, okay, I think I, I think I understand better. I do need to think more through that, though.

31:37 - Edward Kruger (Realwired)
  Yeah, yeah, just think about that flow, because I'm like, hey, you know, if you phone, yeah, I mean, if I phone Best Buy, you know, I talk to Best Buy, then, you know, I'm asking them about their product, and they deliver it to me, you know, I'm not, I'm not necessarily interacting with all the individuals in the chain.  Right.

31:58 - Cody Miles
  But, you know, baseball has.

32:00 - Edward Kruger (Realwired)
  got a certified technician there, that's on them to make that connection. Okay, let's think through it. Okay. Awesome.

32:13 - Cody Miles
  Guys, I have to jump to the next one. Yeah.

32:16 - Edward Kruger (Realwired)
  Awesome. Cool. Thanks, Cody. I can just quickly, I also have to jump, so I'll quickly check this out with Val and then call it.  Okay. All right. Thanks, guys. See ya. Thanks. Thanks, Cody.

32:27 - Val Vinnakota (brandcave.co)
  Okay, what am I looking at? So this would be the real-wide admin, and I think we could leverage some of the features onto the business as well.  So initially from the, you know, from what we already have, it's essentially going to be vendors list and specialties.  Just a simple specialties table where they could add vendors list table. So what I thought was, you know, for the admin themselves, just wanted to see like what is the vendor circle distribution is like, so that real-wide would have better metrics on what their distribution is like.  That's awesome.

32:59 - Edward Kruger (Realwired)
  So maybe maybe

33:00 - Val Vinnakota (brandcave.co)
  We could use something like this, a map in the business admin as well.

33:05 - Edward Kruger (Realwired)
  Yeah, this is great. And even if you kind of select your license, maybe you select your state and then it makes it a little bit easier for you to do the sub-selection.  So I think this is a lot of value.

33:17 - Val Vinnakota (brandcave.co)
  Yeah, so they would know what kind of vendors they have in their company that can work in Texas. Yeah, those are all the features here.  Otherwise, it's a usual, you look into the vendor profile. Again, this is on the RealWired admin. They'll essentially see the entirety of the vendor profile.  Cool.

33:37 - Edward Kruger (Realwired)
  Okay. So this is connected on the Uconnect side? Where do you see this? This lives in the way. Is this the bank's view of that appraisal?

33:51 - Val Vinnakota (brandcave.co)
  I'm not sure. So from Jason's walkthrough, what a Fondos vendor circle also has an instance where admin would be able to control the RealWired.  Admin where they would be able to kind of set up the specialties within the vendor circle where they could select and also have a list of vendors that they could manage and look at their profiles.  But yeah, like a part of it should be on the bank side, which I'm not sure exactly like how it is connected.
  ACTION ITEM: Align w/ Jeff on Vendor Circle/Uconnect integration; then Val design bank-side vendor selection/scorecards - WATCH: https://fathom.video/share/68NP8k1JxdTUbdJtafxzKdzvbkSDxhpM?timestamp=2054.9999  Is that an extra tab or a section within Uconnect or do they have a separate page for the vendor circle?

34:25 - Edward Kruger (Realwired)
  Yeah, that's a that's a great question, Val. Well, we need to probably spend some time with Jeff on this, you know, so let me get him on a call and we can just sort it out.  But yeah, this should exist, you know, because from the business, I probably want to do what we call a vendor selection.  So we want to kind of like see what's my distribution, where am I, who do I need, you know, so you kind of want to filter and then select a vendor, you know, look at their scorecards.  Or you have your own vendor list. You to manage, you know, so there's kind of like that duality from the bank side that lives currently in Uconnect.

35:09 - Val Vinnakota (brandcave.co)
  Gotcha. And the reason why I have scorecards is essentially for that, because I don't know if Bankview exists, but if Bankview does exist, how that could look like?  We can give them a rating on what the vendors they have worked on, and they could add a rating.  But again, this needs to be worked out. I haven't seen what it looks like on the bank end. Yeah, very similar.

35:29 - Edward Kruger (Realwired)
  Yeah, it's very basic. But yeah, this is cool. This is effectively, you know, what it would be. But you would rate that individual report, and you would rate the vendor, because the vendor selection, like I mentioned, you know, if you get a job, and you select, you know, you want this job to be appraised, you know, we'll already know what location it is, so we can filter some of that list, but then what you kind of want to do is you want to present that list in, you know, from high to low.
  ACTION ITEM: Share AI reviews examples w/ Val; then Val design AI reviews - WATCH: https://fathom.video/share/68NP8k1JxdTUbdJtafxzKdzvbkSDxhpM?timestamp=2160.9999  Based on some of the score code criteria, the max. Yeah, so it's, I kind of like, I like where you're going with this, but I would love to push, pull in, Jeff, for this conversation.  Absolutely.

36:11 - Val Vinnakota (brandcave.co)
  And one last thing I could request from you is, I haven't seen the AI reviews, how they really look.  I know we go through that on Scrum every time, but I haven't really seen what it looks like. If I could get a glimpse of it, I'll have an idea how I could model that over here.  Yeah, awesome.

36:26 - Edward Kruger (Realwired)
  Sounds good, Val. Okay, I'll set it up first. have to jump to another one, but. Absolutely. Speak soon. See ya.  Bye-bye. Thank you."

###### 24th October 2019
# Client meeting

* The Client outlines some history about Beaurepaire and it's significance in britain. In a nutshell it was a medieval manor house that was built to defend against the Scottish. It was subject to vandalism throughout the ages (including nowadays).
####Project 1 related conversation.
* The Client imagines walking around with the "app" on your phone and it tells you where you are in the house, and information about that location. This seemed to be the main part of Project 1 - it's effectively a replacement service instead of physical infrastructure (which would get vandalized).
  - An option could be to include QR codes but this was not something she wanted if possible.
  - Instead of GPS it could simply be a map from above where the user can click on the room they're in to learn information about it.
  - With GPS, the info would "pop up" on your phone as you walk about (dynamic HTML probably).
  - Would be good if it told you where you are in the house.
* There are various designs on the walls, she had the idea of pointing your phone at a design and it tells you information about it's history.
* Due to the manor house being in the middle of a field, she suggested having a way of using our program to locate the manor house.
* Must have a link somewhere for the public to "Get involved" and maybe donate.
* She mentioned they have many smaller locations that they might want to add in later/link up with the system if applicable. For instance a well, other smaller ruins.
   - (Could be pretty easy to do this with the "GPS room system" as long as we keep this in mind during development - extra maintainable)
* The client has various bits of random data that they would like to include if possible. This includes geophysical data and other archeological survey data. She implied they don't yet have all this data so we need to keep this in mind during development (extra maintainable).

####Project 2 related conversation.

* There is a church nearby that will be their "Base of operations" for this location. This doesn't mean much, simply that they could direct people to Beaurepaire from here (or potentially our "app" too).
  - This is where the 3D models are useful, they could house the 3D printed models here to show people/volunteers what it looks (used to look) like.
* They have drone data that needs manipulating
  - Needs to be in a manipulatable format.
  - If they want to make infrastructure changes in the future they will need 3D models so they need to conform to the standards set by the government body for this (we'd need to ask them what it is they'd be submitting for so we can check the standards).
  - Some(all?) of this data may have been done using photogrammetry.
    - we need to ask what format the data is in (or preferably the actual data) to work out if we can use it (should ask soon before we commit to a spec).

---
##Extra notes/Details
* The site is only about a 40 minute walk away from durham apparently.
* Durham Uni were the ones that did the drone survey
* Their main demographic is young people to mid 30's.
* When she was describing how she'd use the "app", she sounded like she was very loose with these interactive features (maybe GPS rooms, maybe recognising the patterns using the phone camera, maybe GPS guidance to the field it's in etc). It seems these kinds of interactive features are desirable (Likely she's thinking about them being a cool way to draw more people to the location). Because of this I would say there's leeway in these features - we should brainstorm variations on these/come up with some new ones that could be easier or better and propose these to them.
* We had a little conversation about App vs HTML that mostly highlighted the fact she wasn't sure on which would be better.
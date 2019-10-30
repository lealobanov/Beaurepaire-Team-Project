###### 24th October 2019
# Client meeting

* The Client outlines some history about Beaurepaire and it's significance in Britain and the local community. Essentially, Beaurepaire was a medieval manor house that was built to defend against the Scottish. It was subject to vandalism throughout the ages (including nowadays), which has led to the client being a little hesitant about adding any physical signage to the site as a means of informing visitors about its historical value/signficance. The client's primary aim is to relay the cultural signficance of the site, particularly its valuable role in the region's history across extended time periods, to the local community. 

#### Project 1 related conversation.

* The Client imagines walking around with an "app" on your phone, and it tells you where you are located in the house (e.g. dining hall, bedroom, etc.), and information about that location (and, possibly, what it used to be like, given 3D modeling undertaken in Project 2). This seemed to be the main purpose of Project 1; it's effectively a replacement service instead of physical infrastructure (which would get vandalized). The app should be able to suffice as a tour guide for visitors, as the office cannot be open at all time and the site gets a lot of attention.
  - An option could be to include QR codes, but this was not the client's ideal solution, as they could be vandalised and would also require permission as it's a heritage site.
  - Without GPS functionality, it could simply be an interactive map from above where the user can click on the room they're in to learn information about it.
  - With GPS, the info would "pop up" on your phone as you walk about (dynamic HTML probably).
  - Ideally, this mobile information hotspot would tell you where you are located in the house.
  - "App" development would require separate development for Android and iOS systems; we suggest creating a mobile-compatible website with said features as a reasonable alternative that would work universally across all device types (including desktop).

* There are various designs on the walls of the manor; Rebecca proposed the idea of pointing your phone at a design and it tells you information about it's history.
  - If AR technology is not utilized in Project 1, information about wall murals could be included within the individual descriptions for each room.


* Due to the manor house being in the middle of a field, she suggested having a way of using our program to locate the manor house.
  - Initialize GPS guidance to longitude/latitude coordinates of the manor house and/or visitor's center at nearby church
  - Also just a general write up of how to access the site from nearby locations/towns/cities by car and/or public transport



* Must have a link somewhere for the public to "Get involved" and maybe donate.
   - Link to Paypal, subscribe to email newsletter w/ volunteering opportunities, contact information/form, etc.


* Rebecca mentioned that they have many smaller locations around the property (1300 acre estate) that they might want to add in later/link up with the system if applicable. For instance, a well, other smaller ruins that may be of public interest.
   - (Could be pretty easy to do this with the "GPS room system" as long as we keep this in mind during development - extra maintainable)
   - Main entities (manor, other nearby sites) and their sub-entities (individual rooms)
   - Design site back-end where employees can edit room descriptions and add new sites to the information hotspot

* The client has various bits of random data about the site that they would like to include in the information hotspot if possible. This includes geophysical data and other archeological survey data. Rebecca implied that they don't yet have all this data, so we need to keep this in mind during development (extra maintainable; take into account ease of adding this later on).

* Further geophysical data might be being gathered by the NE project.

#### Project 2 related conversation.

* There is a church nearby that will act as their "base of operations" (visitor's center) for this location. They intend to direct people to Beaurepaire from here (or potentially to access our "app," too).
  - This is where the 3D models are useful; they could house the 3D printed models here to show people/volunteers what the manor looks (used to look) like at various points in history.
  - We need to clarify with Rob/the department the protocol for working with the 3D printer, so we can ensure this deliverable
* They have drone data that needs manipulating
  - Needs to be in a manipulable format (pending from client - should receive by Sunday 3/11)
  - If they want to make infrastructure changes in the future (repairs to the site), they will need 3D models that conform to the standards set out by the government body for this (we'd need to ask them what these criteria are, so we can check that all standards are met).
  - Some(all?) of this data may have been done using photogrammetry.
  - The drone data is in shape files in an arcgis map with nearly all necessary data to complete a 3D model.

---
## Extra notes/Details

* The site is only about a 40 minute walk away from Durham. We were offered a tour of the manor, perhaps even as soon as the 14th Nov.
* Durham Uni were the ones that did the drone survey
* Their main demographic is young people to mid 30's.
* When she was describing how she'd use the "app", she sounded like she was very loose with these interactive features (maybe GPS rooms, maybe recognising the patterns using the phone camera, maybe GPS guidance to the field it's in etc). It seems these kinds of interactive features are desirable (Likely she's thinking about them being a cool way to draw more people to the location). Because of this I would say there's leeway in these features - we should brainstorm variations on these/come up with some new ones that could be easier or better and propose these to them.
  - (interactive?) Timelines showing what the site used to look like throughout history
  - Info "cards" w/ image sliders for each room
  - Incorporate 3D renderings
  - Videos (eg. maybe someone from the staff talking about a particular room/aspect of the manor) 
  - Share on social media
  - Inform users about opportunities to get involved at the site

* We had a little conversation about App vs HTML that mostly highlighted the fact she wasn't sure on which would be better. Used the phrase "up to you" at one point.
  - Need to look into Bootstrap functionality and design elements to see if we can use any aspects of the default template(s) to the present the information appropriately
* Should set up cloud storage location (I think we were provided this alongside the email account) where they can upload content/images and 3D rendering files
* Is there a company/Beaurepaire logo or branding that we need to keep in mind for colors/fonts/general front-end appearance? If not, propose some ideas to them (can use color scheme templates online).
* Need to think about system back-end; ideally this would be an interactive portal-style page, where employees can login and make appropriate changes to info about particular rooms and/or add new site around the property to the system


### Future Meetings
* Thursday's are good
* Will normally be the same client who we meet in person
* Number: 07895 216171
* Email: boowhoimboo@gmail.com (confirmed the spelling in latest email)

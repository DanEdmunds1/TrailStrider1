# TrailStrider1

# Description
This is a full-stack application that serves as a tool for users to compare how long, and in how many steps, it would take to complete a variety of hiking trails. It consists of a back-end Django REST framework API and a front-end React user interface that consumes the API with full C.R.U.D (create, read, update, delete) capabilities.

# Deployment link
https://trailstrider1-99ed82a02533.herokuapp.com/

# Timeframe & Working Team
This was an individual project that took place between 11/01/24 and 21/01/24 inclusive

# Technologies Used
## Front-end: React, JavaScript, HTML, SASS, Bootstrap
## Back-end: Django REST Framework
## Database: PostgreSQL
## Development Tools: Excalidraw, QuickDBD

# Brief
## Technical Requirements:
* Build a full-stack application by making your own backend and your own front-end
* Use a Python Django API using Django REST Framework to serve your data from a Postgres database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Complex Functionality like integrating a 3rd party API or using a particularly complex React Component would mean that the CRUD and multiple relationships requirement can be relaxed
* Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this
* Be deployed online** so it's publicly accessible

## Necessary Deliverables:
* A working app hosted on the internet
* A link to your hosted working app in the URL section of your Github repo
* A git repository hosted on Github, with a link to your hosted project, and frequent commits dating back to the very beginning of the project
* A readme.md file with:
  * An embedded screenshot of the app
  * Explanations of the technologies used
  * A couple paragraphs about the general approach you took
  * Installation instructions for any dependencies
  * Link to your user stories/wireframes – sketches of major views / interfaces in your application
  * Link to your pitch deck/presentation – documentation of your wireframes, user stories, and proposed architecture
  * Descriptions of any unsolved problems or major hurdles you had to overcome

# Planning
I wanted to keep the application simple and thus decided on 4 key pages
* Home page
* Index page
* Single view page
* Profile page
I wanted to include a system that allows users to rate any trail and contribute to an average for each trail but I did not have time for this, so difficulty is only added by the trail’s owner upon creation

Trails will have an owner field that is a Foreign Key to the id of a user
This will be a one-to-many relationship as a trail will only have one owner, but a user can own many trails
Hikers and Reviews will also have an owner field attached to a user id and share the same type of relationship

# Build/Code Process
## Back-End
I started by creating the Django REST Framework back-end API that could serve my data from a PostgreSQL database.

## Home Page
I wanted to include a carousel on my home page as it was an idea I wanted to explore after we reviewed Project 3, and it was a React-Bootstrap component I had not used before. I started by reviewing the documentation and first had the carousel display some dummy text to ensure I could get it working before sinking more time into it. Once I was sure it was functional I added a loader to the Home Page so it had all the trails, then wrote the logic to choose seven random trails from the loader and display them on the carousel, with each carousel item also being a link to the single view page for that trail.

```
<Carousel className="carousel">
    {selectedTrails.map((trail, index) => (
        <Carousel.Item key={index} className="carousel-item" interval={int}>
            <div className="carousel-img" style={{ backgroundImage: `url(${trail.image})` }}></div>
            <Carousel.Caption>
                <div className="carousel-text-box">
                    <Link to={`/trails/${trail.id}`}><h3>{trail.name}</h3></Link>
                    <p>{trail.description}</p>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
    ))}
</Carousel>
```

# Index Page
The Index Page to display all the trails was pretty straightforward as it only displays information stored in each trail item, so only a simple loader was required, which is actually the same loader that the Home Page uses.

# Single View Pages
The Single View Pages required multiple API calls to be made, one for the single trail loader and another to render all of the hikers that the current user has created. The height and walking speed of each hiker are entered into a calculation that also reads the length of the trail, its elevation, and descent, and displays how long, and how many steps, it would take each hiker to complete the trail. 

```
<div className="hiker-box">
    {hikers.map(hiker => {
        if (user && user.user_id === hiker.owner) {
            let stride = (((hiker.height * 100) / 2.54) * 0.413) * 2.54
            let steps = Math.ceil((trail.length * 100000) / stride)
            let duration = (trail.length / (hiker.ability) * 1.609)
            let totalMinutes = Math.floor(duration * 60) + (trail.elevation / 10) - (trail.descent / 30)
            let hours = Math.floor(totalMinutes / 60)
            let minutes = Math.floor(totalMinutes % 60)

            return (
                <div key={hiker.id} className="hiker-container">
                    <img className="single-view-avatar" src={hiker.picture} alt="hiker image" />
                    <p><span className="hiker-name">{hiker.name}</span>: {steps} steps : {hours}hrs {minutes}mins</p>
                </div>
            )
        }
        return null
    })}
</div>
```

To account for the fact that one user may have a large number of hikers, the container displaying the hikers is given its own scroll bar once the number of hikers exceeds the size of the container.
This page also displays all reviews posted on the trail, alongside the timestamp at which the review was made, and the username of the author. If a user has a valid token they can also create a review, and upon posting the review they are navigated back to the trail the review was posted to.

## Profile Page
The Profile Page contains a few interesting features. The first of which is the functionality to create new hikers, give them a height and walking speed, and select an avatar image for them from a selection of stored images.
Another feature is the ability for the user to select a profile avatar image from the same selection. Their choice is stored in local storage and also stored and updated in state when they select it so the image updates in real-time upon selection.
The final feature is the container that displays all the reviews that the user has written, showing the review text, the trail the review was posted on, and the timestamp from the review.

## Navigation Bar
The navigation bar changes slightly depending on whether the user has a valid JWT. Once a user logs in they are given a token that is valid for one day and each time a page is loaded the navbar will check whether the token is still valid. If this is the case, the navbar will show a LogOut button, but if the token has expired or there is no token at all then it will show a Register and a Login button instead. 

## Reactivity
I turned my trail creation, trail updating, and hiker creation pages into modals because I personally prefer the look of this over having a separate page. I also create deletion confirmation modals for hikers and trails, as well as a logout confirmation modal, as I feel that users do not expect to delete items with a single click and it could be that they have accidentally clicked the delete button. 

# Challenges
I wanted to render the username of the author of any review that was posted to a trail alongside the review text, but when I logged out the user all that was returned was the user’s id.
I returned to the back end to populate the user field with the user object with a populated serializer, but although this should have fixed the problem, the user object was still not being returned.

After trying to solve the problem for a few hours I decided to work on other parts of my application and come back to it later. The next day after asking the teachers at GA and checking multiple online resources I still could not figure out why it wasn’t working, everything was as it should be. 
Then I realised I’d made a silly mistake. I missed the brackets at the end of the serializers I was calling in the populated serializer, i.e. they did not have ‘()’ at the end. Annoyingly this was only a small error yet it represented a large time-sink, but at least the extra research I conducted to try and solve the problem developed my understand of serializers and populated serializers.

# Wins
I’m particularly proud of the functionality that allows a user to select a profile avatar from the profile page. I started by storing the user’s selection in local storage and pulling their selection to render on the profile page each time it was loaded. However, their selected image was not rendered immediately after choosing it. To solve for this I set a userImg variable in state and updated the state at the same time as their choice of image was stored in local storage.

```
    const [userImage, setUserImage] = useState(getUserImage)
   function getUserImage() {
        return localStorage.getItem('profile-pic')
    }

    function chooseUserImage(img) {
        localStorage.setItem('profile-pic', img)
        setUserImage(img)
    }
```

It is a fairly simple solution but I was proud of coming up with this solution quickly and having it work the first time without the need to revisit the issue.

# Key Learnings/Takeaways
Due to the time spent researching serializers and model population to solve my main challenge, I feel more confident in using Django REST Framework and modifying the templates I had learned to better suit my needs.

# Bugs
There are no bugs that I am aware of as of right now, however, the button to change to colour scheme of the application does not fully work as intended, I go into more detail on this in the future improvements section below

# Future Improvements
I turned my trail creation, trail updating, and hiker creation pages into modals because I personally prefer the look of this over having a separate page. I wanted to do the same for the review form but I couldn’t figure out how to load multiple actions onto the single view page, as I was already loading the action to update a trail that is owned by the user.
The button that changes the colour-scheme successfully changes the state variable and the local storage in which the SCSS file name is stored, but will only render the changes once until the page is refreshed, and therefore does not work as fully intended, so I would like to fix this.

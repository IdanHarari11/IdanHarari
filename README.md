# few steps first :

run the following commands lines -
1. npm install 
2. npm run start

# pages
    Home - 
    display the home page that includes the UserList component that
    all the users with some details of any of them (phone call, send email, add to favorite ...).
    Have an option to filter the users by country.

    Favorite -
    display the favorite page that includes all of 
    the favorites users that choose.
    Have the same option for any user like the home page,
    click on the heart button will unfavorite the user.

# ValidateList
    validate the list and check if needs to show any validate alert 

# hooks
    userPeopleFetch -
    fetch the users from the API on componentDidMount and after each
    time that the user will scroll down to the bottom of the users list.

# AppRouter
    control the navigation to the specific route and connected 
    to the NavBar component for GUI

# context
    FavoriteCTX -
    Have all the access to the favorite list,
    get the list from the local storage for the first entrance (if have something there)
    and set the list to the local storage after each adding to the favorite list.
    Export the addFavoriteHandler to controll the favorite list.

# helpers  
    few constants that help the code to be cleaner
    (countries array, find method from the array, set/get to/from local storage)


# My appreciation from the project:
The project was very nice, interesting but not particularly difficult. 
I tried to keep things abstract without unnecessary complications.
I added some nice features, very much hope that I did the job properly and that you will like the end result.
Thanks ! 
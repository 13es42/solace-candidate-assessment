
So as I cross the 2 hour finish line I'm reviewing what I did and what I would like to have done.

I would try to Seperate the data horizontally more.  Some of it still looks like its bunching a little too close.

I would make the "Reset Search" button also clear the textbox.

I would add an additional search button that takes what they type in and query the db for the things they are looking for instead of returning all records from the begining. 
Maybe add a drop down of all possible search paramters to give the user a little more control over what they are searching for.

I would add a loading state while the user is waiting on data to be returned.

I would handle the regex process on the backend.

I would set up an serverless project or something similar to handle incoming requests and only let that touch the db.  I wouldnt let the front end have a direct connection to the db.

I would also highlight the things that are returned that match what they searched for so they can see why things are being returned to them.  

I would have added error handling for missing data and anything unexpected.
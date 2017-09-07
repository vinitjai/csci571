var app = angular.module('myApp', ['ngAnimate']);
app.controller('myCtrl', function($scope, $http, $window,$compile) {

 // Handling for sliding mechanism

$scope.stc = "test";
$scope.spc = "test"; 

$scope.clearform = function (){

    $scope.showtables = false;
    $scope.showpanels = false;
    $scope.textdatas = null;
    $scope.stc = "test";
    $scope.spc = "test"; 
      
    
}
    
 //intialization
$scope.showtables = false;
$scope.showpanels = false;

    
$scope.my = {      ShowP: false,
                   myFa: false,
                   ShowNext: false,
                   ShowPrevious:false,
                   myV: false
                   };
    
    
$scope.a = [];
    
$scope.nodisplayforalbums = false;
$scope.nodisplayformessages = false;   
    
// START OF JS FUNCTIONS USED FOR ALBUMS AND POSTS DISPLAY
 
    

$scope.getImage = function(rn,cn){  // To get image for albums from array
    
        if(!(angular.isUndefined($scope.myarray[rn][cn]))){
                
            return $scope.myarray[rn][cn].res.data.url;
        }
}
    
$scope.getTime = function(ti){  // to get time for posts
        
        return moment(ti).format('YYYY-MM-DD hh:mm:ss');
}
    
$scope.backButton = function(){

    $scope.stc = 'animate-hide-new';
    $scope.spc = 'test';
    
   $scope.showpanels = false;    
   $scope.showtables = true;
     
}   

$scope.submitid = function(vidf,imgurl,name) { // whenever details is clicked
    
    $scope.spc = 'animate-hide';
    $scope.stc = 'test';
    
    
    $scope.imgurlforposts = imgurl;
    $scope.nameforposts = name;
    $scope.showtables = false;
    $scope.showpanels = true;
    $scope.ShowProgress = true;
    $scope.myVarFA=false;
    $scope.myVarFP=false;
    var config = {
    params: {
        id:vidf,
        v2:"hello"
       }
    }

  $http.get('http://sample-env.nm7rswz37f.us-west-1.elasticbeanstalk.com/animate.php',config).then(function(response) {
        
       $scope.myWelcome = response.data;
      
       if(!($scope.myWelcome.res)){
           
            $scope.nodisplayforalbums = true;    
            $scope.nodisplayformessages = true;
            $scope.myVarFP=false;
            $scope.myVarFA=false;
           return;
            
        }
       
        if((angular.isUndefined($scope.myWelcome.res.posts))){
                
            $scope.nodisplayformessages = true;
            $scope.myVarFP=false;
            
        }else{
            
            $scope.nodisplayformessages = false; 
        }
    
        if((angular.isUndefined($scope.myWelcome.res.albums))){    
            
            $scope.nodisplayforalbums = true;
            $scope.myVarFA=false;
            return;
            
        }else{
            
            $scope.nodisplayforalbums = false;
        }
      
        $scope.myfoo();
    
    }).finally(function() {
   
      $scope.ShowProgress = false;
      $scope.myVarFA=true;
      $scope.myVarFP=true;
      
    }); 
     
}
 

$scope.myfoo = function(){   // To fetch data for albums
    
     
    var os = $scope.myWelcome.res.albums.data.length;
    
    if(os > 5){   //number of albums 
        os = 5;
    }
     
    $scope.myarray= [] ;   // To initialize the 2d array for storing albums
    for (var m = 0; m < os; m++)
        $scope.myarray[m]= [];
    
                  
    for (var i = 0; i < os; i++) {   // Begin fetcing albums
        
        
        var is = $scope.myWelcome.res.albums.data[i].photos.data.length;
        
        
        if(is > 2){   // number of images to get
            is = 2;
          }
        
        for (var k = 0; k < is; k++) {
            
               $scope.getImageData(i,k);  // get 2 images
                
        } // end fetching images 
     }   // end fetching albums   
} // end of function
               
$scope.getImageData = function(row,col){  //get images 
         
        var config1 = {
        params: {
        imdd:  $scope.myWelcome.res.albums.data[row].photos.data[col].id,
        v2:"world"
        }
     }
        
       $http.get('http://sample-env.nm7rswz37f.us-west-1.elasticbeanstalk.com/animate.php',config1).then(function(response) {
       
           $scope.myarray[row][col] = response.data;  //store the image in 2d array
    
        }).finally(function() {
    
       }); 
               
} 

// END OF JS FUNCTIONS USED FOR ALBUMS AND POSTS DISPLAY

// START OF JS FUNCTIONS USED FOR TABLES DISPLAY

// used to initialize favourites

$scope.initializeFavouritesarray = function (){
    len=localStorage.length;
    for(var i=0; i<len; i++){
    var keyv = localStorage.key(i); 
    var pu = JSON.parse(localStorage.getItem(keyv));
    $scope.a.push(pu);
      
  }
}

$scope.initializeFavouritesarray();
 
$scope.DeleteFavWithoutIndex = function(dataiss,idx){
      
        console.log("removing delete without index");
       var ids = dataiss.id;
       for(var l=0;l<$scope.a.length;l++){
           valueofdata = $scope.a[l];
           console.log(valueofdata.id + "=>" +ids);
           if(valueofdata.id  === ids){
               console.log("found!");
              localStorage.removeItem(ids);
              $scope.a.splice(l, 1); 
           }
       }
}
    
$scope.DeleteFav = function(dataiss,idx){
      
       var ids = dataiss.id;
       
       localStorage.removeItem(ids);
      
       $scope.a.splice(idx, 1);
}

$scope.ifthisFavouritePresent = function(idskey){
  
    len=localStorage.length;
  
    for(var i=0; i<len; i++) {
        var keyv = localStorage.key(i);
     
        if(keyv == idskey){
            return true;
        }
     }
    return false;
}

$scope.submitFav = function(datai,ind){
    
       if($scope.ifthisFavouritePresent(datai.id)){
       
        $scope.DeleteFavWithoutIndex(datai,ind);
        var test = angular.element(document.querySelector('#favid-'+datai.id)).css('-webkit-text-stroke-width');
        console.log(test);
        if(test == "0px"){
            angular.element('#favid-'+datai.id).css('color', 'initial');
           angular.element('#favid-'+datai.id).css('-webkit-text-stroke-width', 'initial'); 
          //  angular.element('#favid-'+datai.id).css('-webkit-text-stroke-color', 'black');
        }else{
            angular.element('#favid-'+datai.id).css('color', 'white');
            angular.element('#favid-'+datai.id).css('-webkit-text-stroke-width', '1px');
             angular.element('#favid-'+datai.id).css('-webkit-text-stroke-color', 'black');
        }
        
       }
       else{
         var ids = datai.id;
         localStorage.setItem(ids, JSON.stringify(datai));
         angular.element('#favid-'+datai.id).css('color', 'yellow').removeClass('fa-star-o').addClass('fa-star');
         angular.element('#favid-'+datai.id).css('-webkit-text-stroke-width', '1px');
        // angular.element('#favid-'+datai.id).css('-webkit-text-stroke-color', 'black');
         var pu = JSON.parse(localStorage.getItem(ids));
          $scope.a.push(pu);
       }
}
    
$scope.b = ["user", "pages", "events", "places", "groups"];
    
$scope.getAllFav = function(){
       $scope.activeMenu = "favourites";
       $scope.my.myV = false;
       $scope.my.myFa = true;
       $scope.my.ShowNext = false;
       $scope.my.ShowPrevious = false; 
       
    }
    
$scope.submit1 = function(uniqueParam) {  // whenever user presses any tab/serach
    
        $scope.stc = "test";
        $scope.spc = "test"; 
        $scope.activeMenu = uniqueParam;
    
        if(!($scope.textdatas)){
            
            return;
        }
        
        $scope.showtables = true;
        $scope.showpanels = false;
        $scope.my.myFa = false;
        $scope.my.ShowP = true;
        $scope.my.myV = false;
        $scope.my.ShowNext = false;
        $scope.my.ShowPrevious = false;
        
                
    if(uniqueParam == "place"){    // if place tab is selected
        
        // to get currenr device location
        navigator.geolocation.getCurrentPosition(function(position){
        
        var config = {
          params: {
           Keyword: encodeURI($scope.textdatas),
           Type:uniqueParam,
           lat:position.coords.latitude,
           lon:position.coords.longitude,
           t2:"v7"
           }
        }
        
        $http.get('http://sample-env.nm7rswz37f.us-west-1.elasticbeanstalk.com/animate.php',config).then(function(response) { 
            
        $scope.myWelcomeOne = response.data;
        $scope.initializeexistingfavourites();
            
        }).finally(function() {
    
       $scope.my.ShowP = false;
       $scope.my.myV = true;
        
       }); 
            
      });  // end of navigator function
        
    }  // end if
    else{   // else for all cases except places       
    var config = {
    params: {
        Keyword: encodeURI($scope.textdatas),
        Type:uniqueParam,
        t2:"v2"
      }
   }
    $http.get('http://sample-env.nm7rswz37f.us-west-1.elasticbeanstalk.com/animate.php',config).then(function(response) {
        
       $scope.myWelcomeOne = response.data;   
       $scope.mybar();
       
        
    }).finally(function() {
     
        
     $scope.my.ShowP = false;
     $scope.my.myV = true;
     
        
   });
        
  } //end of else
  
 $scope.initializeexistingfavourites();   
}  //end of submit1


$scope.initializeexistingfavourites = function(){
    
    
    stlen= localStorage.length;
    dlen = $scope.myWelcomeOne.res.data.length;
    for(var k=0;k < dlen; k++){
        var idfromdata = $scope.myWelcomeOne.res.data[k].id;
        for(var i=0; i< stlen; i++){
             var keyv = localStorage.key(i);
            console.log(keyv + "=>" +idfromdata);
             if(keyv == idfromdata){
            angular.element('#favid-'+idfromdata).removeClass('fa-star-o').addClass('fa-star');
            angular.element('#favid-'+idfromdata).css('color', 'yellow');
       angular.element('#favid-'+idfromdata).css('-webkit-text-stroke-width', '1px');               
             }
        }
    }
    
}

$scope.mybar = function(){   // function to decide pagination exists or not
    
    if(!(angular.isUndefined($scope.myWelcomeOne.res.paging))){
                               
      if(!(angular.isUndefined(JSON.stringify($scope.myWelcomeOne.res.paging.next)))){    
                   
          $scope.my.ShowNext = true;
                   
      }else{
        
          $scope.my.ShowNext = false;
      }
    
      if(!(angular.isUndefined(JSON.stringify($scope.myWelcomeOne.res.paging.previous)))){
                  
                   $scope.my.ShowPrevious = true;
                   
      }else{
          
            $scope.my.ShowPrevious = false;
          
       }
  }
    
}
     
            
$scope.shownext = function(){   // function to diplay next page
      $scope.my.ShowP = true;
      var config3 = {
      params: {
        onlyurl: $scope.myWelcomeOne.res.paging.next,
        t2:"NURL"
     }
    }
    
    $http.get('http://sample-env.nm7rswz37f.us-west-1.elasticbeanstalk.com/animate.php',config3).then(function(response) {
           
       $scope.myWelcomeOne = response.data;
       $scope.mybar();
        
    }).finally(function() {
        
     $scope.my.ShowP = false;
     $scope.my.myV = true;          
        
   });
                 
}
        
$scope.showprev = function(){
      $scope.my.ShowP = true;
       var config4 = {
       params: {
        onlyurl: $scope.myWelcomeOne.res.paging.previous,
        t2:"PURL"
      }
     }
    
    $http.get('http://sample-env.nm7rswz37f.us-west-1.elasticbeanstalk.com/animate.php',config4).then(function(response) {
        
       $scope.myWelcomeOne = response.data;
       $scope.mybar();
        
    }).finally(function() {
        
     $scope.my.ShowP = false;
     $scope.my.myV = true; 
        
   });
            
}
    
// END OF JS FUNCTIONS USED FOR TABLES DISPLAY

 // end of myApp and controller functions
    
window.fbAsyncInit = function() {
    
       FB.init({
           
         appId      : '616298648564458',
         cookie     : true,  // enable cookies to allow the server to access 
                        // the session
         xfbml      : true,  // parse social plugins on this page
         version    : 'v2.8' // use graph api version 2.8
     });

     FB.getLoginStatus(function(response) {
     });
 
};

// Load the SDK asynchronously
(function(d, s, id) {
    
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
    
}(document, 'script', 'facebook-jssdk'));

$scope.myfu = function() { 
    
    FB.ui({
    app_id: '616298648564458',
    message: 'Facebook',
    method: 'feed',
    link: window.location.href,
    picture: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwi34PfA5InTAhVqsVQKHZ4HA7kQjRwIBw&url=http%3A%2F%2Fwww.tuxpaint.org%2Fgallery%2F%3Fcur_pict%3D282&psig=AFQjCNG7X_MUEgVQtU_5AQZgnbWoqj2zXw&ust=1491360356526288&cad=rjt',
    name: 'Vinit',
    caption: 'FB SEARCH FROM USC CSCI571',
        
}, function(response){
        
      if (response && !response.error_message)
           alert("Posted Succesfully");
      else
           alert("Not Posted");
        
    });
}

});


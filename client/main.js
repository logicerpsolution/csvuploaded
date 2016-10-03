import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
Sales= new Mongo.Collection("Sales");

const PlayersIndex = new EasySearch.Index({
    collection: Sales,
    fields: ['Navn'],
    engine: new EasySearch.Minimongo()
  });



Template.upload.onCreated( () => {
var self = this; 
var ar=[];
var jsonObj={};
Template.instance().uploading= new ReactiveVar (false);

 Meteor.call("GetUploadedCSV",( error, response ) => {
 try{
 //Object.keys(response[0])
 var totalCount=Object.keys(response[0]).length;
  
 for ( let i = 0; i < totalCount; i++ ) {
  ar.push({index:i});
 }
 
   debugger;
 
   Session.set("tempData",response);
   Session.set("count",ar);  
   Session.set("headers",Object.keys(response[0]));
   Session.set("recVal",response);
   Session.set("jsonVal",jsonObj);
   //response
   }catch(ex){
   debugger;
   }  
 });
 Session.set("Index",0);
});
  
//Template.searchBox1.helpers({
  //   playersIndex: () => PlayersIndex

//});

Template.upload.helpers({
playersIndex: () => PlayersIndex,
 getIndex(gridHeader,index){
   return {gridHeader:gridHeader,index:index.index};
 },
  uploading() {
    return Template.instance().uploading.get();
  },
  gridHeader(){ 
  return Session.get("headers");
  },
   gridCount(){
   return Session.get("count");
  },
  record(){
  return Session.get("recVal");
  }

  //,// searchResults(){
  // var keyword  = Session.get("search-query");
    // Meteor.call( 'searchRecord', keyword, ( error, response ) => {
	// //Session.set("searchRec",response[0]);
            // if ( error ) {
              // console.log( error.reason );			   
            // } else {       
			// //var getS= Session.get("searchRec");
			    // console.log(response);
            // }
          // });      
  // }

});

Template.upload.events({
  'change [name="uploadCSV"]' ( event, template ) {
    template.uploading.set( true );
	
    Papa.parse( event.target.files[0],
	{
	header: true,complete( results, file ) {
	
	template.gridHeader.set(Object.keys(results.data[0]));  
	
	template.record.set(results.data);
	
	var _tempData=results.data;
	
	console.log(results.data);
	
	template.gridCount.set(results.data);
	
      }
    });
  }
  
});

if (Meteor.isClient) {
  Template.body.events({
    'change select' : function(event){	
	 var totalProps=Session.get("count");
	 var _jsonObj=Session.get("jsonVal");
	 
	  for(let i = 0; i <= totalProps.length; i++){	  
	   var insertpost =  $("#category-select"+i).val() ;	   
	   if(insertpost!=null){
	   var isExist=false;
	   var objKey = Object.keys(_jsonObj);
	    for(let m= 0; m < objKey.length; m++){
		    if(_jsonObj[objKey[m]]==insertpost){			 
			 isExist=true;
			// if(isExist){
			// Bert.alert( 'Property already exist!', 'danger', 'growl-top-right' );
			// }
			}
		}
		
		if(!isExist||objKey.length==0){
	       _jsonObj[i]=insertpost;
		  Session.set("jsonVal",_jsonObj);
		   }	   
	   }
          }
	  }
  }),
  
  Template.body.events({
  
    'click .AddPlaceButton': function (e) {
      e.preventDefault();

	  var record=Session.get("recVal");

	  var _jsonObj=Session.get("jsonVal");
	  var objKey = Object.keys(_jsonObj);
	  var recordKey=Object.keys(record[0]);
	  // console.log(recordKey);
	  var _jsonData=[];
	  for(let i = 0; i < record.length; i++){
	  var _temoObj={};
	  for(let m= 0; m < objKey.length; m++){
		  _temoObj[_jsonObj[objKey[m]]]=record[i][recordKey[m]];
      	}
		if(objKey.length>0)
		_jsonData.push(_temoObj);
		}
	  
	    Meteor.call( 'mappedRecord', _jsonData, ( error, response ) => {
            if ( error ) {
              console.log( error.reason );
			   Bert.alert( 'Id already exist!', 'danger', 'growl-top-right' );
            } else {       
			   Bert.alert( 'Saved successfully!', 'success', 'growl-top-right' ); 
            }
          });
    }
	

		
  });
  
  
  
  
  // Template.register.events({
    // 'submit form': function(event){
        // event.preventDefault();
        // var email = $('[name=email]').val();
        // var password = $('[name=password]').val();
		// Accounts.createUser({
		  // email:email,
		  // password:password
		// });
    // }
   // });

   // Template.login.events({
    // 'submit form': function(event,template){
        // event.preventDefault();
        // var email = $('[name=email]').val();
        // var password = $('[name=password]').val();
		// Meteor.loginWithPassword(email, password, function(error){
         // if (error) {
		
		 // var message = "There was an error logging in: <strong>" + error.reason + "</strong>";
		 // template.find('#form-messages').innerHTML=message;
		 // console.log(error);
		 // }
		 // else{
		 // var message = "You are login successfully";
		 // template.find('#form-messages').innerHTML=message;
		 // template.validLogin.set(message);
		 // }
         // });
    // }
   // });
}






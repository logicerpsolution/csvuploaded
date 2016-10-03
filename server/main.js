import { Meteor } from 'meteor/meteor';

Sales= new Mongo.Collection("Sales");

Board=new Mongo.Collection("Board");
Meteor.startup(() => {
  // code to run on server at startup
    process.env.MONGO_URL = 'mongodb://192.168.1.93:82/CSV'; 
});


Meteor.methods({

  parseUpload:function(data) {
  
  // for ( let i = 0; i < data.length; i++ ) {
  // data[i]["Minansatte"]= data[i]["Min. ansatte"]
   //data[i]["Maxansatte"]=data[i]["Max. ansatte"]
   // delete data[i]["Min. ansatte"];
   // delete data[i]["Max. ansatte"];
  // console.log(data[i]);
       // Customer.insert(data[i]);
  //   }
  
  
 //var a = Meteor.sales.find().fetch();

   //  return a;
  
  },
  
  mappedRecord:function(data){
   for ( let i = 0; i < data.length; i++ ) {
     // var rec=Board.find().fetch();
	 // console.log(rec);
      console.log(data[i]); 
      Board.insert(data[i]);
	  }
	},
	
	//searchRecord:function(keyword){
	 // var query = new RegExp( keyword, 'i' );
     // var results = Sales.find( { $or:[{'Selskabsstatus': query}] }).fetch();
	 //{ Selskabsstatus: {$regex: query, $options: '-i'} };
	//  var rst= { Selskabsstatus: 'Normal' };
	  //console.log(rst);
     // var newS=Sales.find({rst}).fetch();	
	//	console.log(Sales.find({rst},{limit:5}).fetch());
	// return {resuts: newS};
	//},
	
	
  GetUploadedCSV:function(){
     return Sales.find({},{limit:15}).fetch();
  },
  
  
  // PlayersIndex:function(){
    // const PlayersIndex = new EasySearch.Index({
    // collection: Sales,
    // fields: ['Selskabsstatus'],
    // engine: new EasySearch.Minimongo()
  // });
// }
     
	
 });


 const PlayersIndex = new EasySearch.Index({
    collection: Sales,
    fields: ['Navn'],
    engine: new EasySearch.Minimongo()
  });
  
   
  


 


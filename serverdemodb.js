var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

(function() {
	var fs, http, qs, server, url;
	http = require('http');
	url = require('url');
	qs = require('querystring');
	fs = require('fs');
	
	var loginStatus = false, loginUser = "";
	
	server = http.createServer(function(req, res) {
		var action, form, formData, msg, publicPath, urlData, stringMsg;
		urlData = url.parse(req.url, true);
		action = urlData.pathname;
		publicPath = __dirname + "\\public\\";
		console.log(req.url);
		
		
		
		if (action === "/register") {
			console.log("Register");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Email:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("user").count({"Email" : splitName[1]}, function(err, count){
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("user exist");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("user").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("1 document inserted");
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
				
			} 
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "Register.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 
		else if( action ==="/newpage")
		{
			res.writeHead(200, {
				"Content-Type": "text/html"
			});
			return res.end("<h1>welcome to new page</h1><p><a href=\"/alexpage\">register</a></p>");
		}
		else if (action === "/login"){
			console.log("Login");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Email:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							console.log(user);
							dbo.collection("user").count({"Email" : splitName[1] , "password" : splitPassword[1] }, function(err, count){
								console.log(err, count);
								finalcount = count;
								console.log("myconut="+count);
								if(finalcount > 0)
								{
									console.log("Login success");
									db.close();
									return res.end(splitName[1]);
								}
								else
								{
										console.log("Login failed");
										db.close();
										//return res.end(msg);
									return res.end("fail");
								}
							});
						});
					});
				});
			}	
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "Login.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 
		else if (action === "/index"){
			console.log("Index");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						
						var tempSplitName = splitMsg[1];
						var tempSplitPassword = splitMsg[2];
						
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = " Name:" + splitName[1];
						var searchPW = " Password:" + splitPassword[1];
						console.log("mess="+msg);
						console.log("mess="+formData);	
						//console.log("split=" + msg[1]);
						console.log("search=" + searchDB);
						console.log("search=" + searchPW);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
					});
				});
			}
		else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "index.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		} 
		else if (action === "/member"){
			console.log("Member_page");
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
							dbo.collection("user").count({"Email" : splitName[1]}, function(err, count){
								finalcount = count;
								console.log(finalcount);
								if(finalcount < 1)
								{
									console.log("Not have this user");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("favlist").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									{
										console.log("Data inserted");
										db.close();
										return res.end("OK");
										});
								}
							});
							dbo.collection("favlist").findOne({"Email" : splitName[1]}, function(err, result) {
							if (err) throw err;
							console.log(result);
							db.close();
							});
						});
					});
				});
			}

		else
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "member.html";
				console.log("here");
			
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
						}
					});
				}
		}
		else if (action === "/readfavourlist")
		{
			console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
				MongoClient.connect(dbUrl, function(err, db) 
				{
					var finalcount;
					if (err) throw err;
					var dbo = db.db("database");
					dbo.collection("favlist").find({"Email" : splitName[1]}).toArray(function(err, result) 
					{
    				if (err) throw err;
    				console.log("result" + result);
    				db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
            return res.end(resultReturn);
					});
				});
			});
		});
	}
}

else if (req.url === "/getapi")
			{
			console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("database");
  //Find all documents in the collection:
  dbo.collection("index").find({}).toArray(function(err, result){
						if (err) throw err;
					console.log(result);
					db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
						return res.end(resultReturn);
	});
});
});
});
}
	sendFileContent(res, "outputapi.html", "text/html");
}

else if (action === "/findapi"){
console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("database");
  //Find all documents in the collection:
  dbo.collection("index").find({}).toArray(function(err, result){
						if (err) throw err;
					console.log(result);
					db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
						return res.end(resultReturn);
	});
});
});
});
}
}
else if (action === "/editfavlist21"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"about":"hi"};
									var newvalues = { $set: {"about" : splitFavlist[1]}};
									dbo.collection("index").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
else if (action === "/addfavcar")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						//console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1], "image":"car1.jpg","car_name":"LaFerrari","buttonid":"delfav1","color":["blue","dark","yellow"],"price":"$22500000","description":"LaFerrari, project name F150 and unofficially referred to as the Ferrari LaFerrari is a limited production hybrid sports car built by Italian automotive manufacturer Ferrari. LaFerrari means The Ferrari in Italian and some other Romance languages, in the sense that it is the definitive Ferrari. The sports car is the last Ferrari model with a mid-mounted 12-cylinder engine."}];
								dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercar").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/addfavcar2")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
					//	console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");																															
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1], "image":"car2.jpg","car_name":"Veneno","buttonid":"delfav2","color":["white","dark","yellow"],"price":"$45000000", "description":"The Lamborghini Veneno Spanish pronunciation is a limited-production high-performance sports car manufactured by Italian automobile manufacturer Lamborghini. Based on the Lamborghini Aventador, the Veneno was developed to celebrate Lamborghini's 50th anniversary. It was introduced at the 2013 Geneva Motor Show. When introduced, it had a price of US$4,000,000, making it one of the most expensive production cars in the world. The prototype, Car Zero, is finished in Grigio Telesto (medium grey) and includes an Italian flag vinyl on both sides of the car."}];
								dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car2.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercar").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/addfavcar3")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
					//	console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");																																	
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"car3.jpg","car_name":"McLaren P1","buttonid":"delfav3","color":["blue","dark","yellow"],"price":"$12600000","description":"The McLaren P1 is a limited-production plug-in hybrid sports car produced by British automobile manufacturer McLaren Automotive. Debuted at the 2012 Paris Motor Show, sales of the P1 began in the United Kingdom in October 2013 and all 375 units were sold out by November. Production ended in early December 2015. The United States accounted for 34% of the units and Europe for 26%."}];
								dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car3.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercar").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/addfavcar4")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
					//	console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");																																
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"car4.jpg","car_name":"Apollo Intensa Emozione","buttonid":"delfav4","color":["red","dark","yellow"], "price":"$13800000","description":"The Apollo Intensa Emozione is a mid-engine sports car manufactured by German automobile manufacturer Apollo Automobil GmbH, designed by their Chief Designer, Joe Wong. The car is sometimes referred to as the IE, which stands for Intensa Emozione. The name itself means 'intense emotion' in Italian. This is the first vehicle made by Apollo since the Gumpert Apollo that went into production 14 years before."}];
								dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car4.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercar").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/addfavcar5")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
					//	console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");																																
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"car5.jpg","car_name":"Zonda","buttonid":"delfav5","color":["blue","dark","yellow"],"price":"$12000000","description":"The Pagani Zonda is a mid-engine sports car produced by the Italian sports car manufacturer Pagani. It debuted at the 1999 Geneva Motor Show. By 2018, a total of 140 cars had been built, including development mules. Both 2-door coupé and roadster variants have been produced along with a third new variant being the barchetta. Construction is mainly of carbon fibre."}];
								dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car5.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercar").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/addfavcar6")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
					//	console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");																																
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"car6.jpg","car_name":"Bugatti Veyron","buttonid":"delfav6","color":["blue","pink","yellow"],"price":"$25000000","description":"The Bugatti Veyron EB 16.4 is a mid-engine sports car, designed and developed in Germany by the Volkswagen Group and manufactured in Molsheim, France, by French automobile manufacturer Bugatti. It was named after the racing driver Pierre Veyron. The original version has a top speed of 407 km/h (253 mph). It was named Car of the Decade and best car award (2000–2009) by the BBC television program Top Gear. The standard Bugatti Veyron also won Top Gear's Best Car Driven All Year award in 2005."}];
								dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car6.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercar").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/addfavcar7")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
					//	console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");																															
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"car7.jpg","car_name":"Koenigsegg One","buttonid":"delfav7","color":["blue","dark","green"],"price":"$47000000","description":"The Koenigsegg Agera is a mid-engine sports car produced by Swedish car manufacturer Koenigsegg. It is a successor to the CCX/CCXR. "}];
								dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car7.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercar").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/addfavcar8")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
					//	console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");																														
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"car8.jpg","car_name":"Dodge Viper","buttonid":"delfav8","color":["blue","dark","yellow"],"price":"$10700000","description":"The Dodge Viper is a super car that was manufactured by Dodge (SRT for 2013 and 2014), a division of American car manufacturer FCA US LLC from 1991 through 2017, having taken a brief hiatus in 2007 and from 2010–2013. Production of the two-seat super car began at New Mack Assembly Plant in 1991 and moved to Conner Avenue Assembly Plant in October 1995."}];
								dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car8.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercar").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		else if (action === "/addfavcar9")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						//console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");																															
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"car9.jpg","car_name":"SSC Ultimate Aero XT","buttonid":"delfav9","color":["blue","dark","green"],"price":"$50000000","description":"The SSC Ultimate Aero is a mid-engined sports car that was produced by SSC North America (formerly known as Shelby SuperCars) from 2006 until 2013. The SSC Ultimate Aero held the title of the fastest production car in the world, according to the Guinness World Records, from 2007 (when it was officially timed at 256.18 mph (412.28 km/h)) until the introduction of the Bugatti Veyron Super Sport in 2010. In April 2013, the Guinness World Records temporarily disqualified the Veyron's record time for a period of five days due to concerns about electronic speed limiting changing the function of the car, but after investigation reinstated the Veyron as the record holder."}];
								dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car9.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercar").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}	
		else if (action === "/addfavcar10")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						//console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");																										
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"Email" : splitName[1],"image":"car10.jpg","car_name":"Lykan hype","buttonid":"delfav10","color":["blue","dark","green"],"price":"$90000000","description":"The Lykan Hypersport is a Lebanese limited production sports car manufactured by W Motors, a United Arab Emirates based company, founded in 2012 in Lebanon with the collaboration of Lebanese and Italian engineers. It is the first sports car to be designed and produced indigenously in the Middle East."}];
								dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car10.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else
								{
								
										dbo.collection("usercar").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});
			} 
		
		}
else if (action === "/clearfavcar")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1]};
								/*dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 1)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else */
								{
								
										dbo.collection("usercar").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("info deleted");
											db.close();
										});
									

						}
						//	}); 
		
						});
					});
				});
			} 
		
		}	
else if (action === "/removefavcar")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"car1.jpg"};
								/*dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 1)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else */
								{
								
										dbo.collection("usercar").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("info deleted");
											db.close();
										});
									

						}
						//	}); 
		
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/removefavcar2")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"car2.jpg"};
								/*dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 1)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else */
								{
								
										dbo.collection("usercar").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("info deleted");
											db.close();
										});
									

						}
						//	}); 
		
						});
					});
				});
			} 
		
		}	
		
		else if (action === "/removefavcar3")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"car3.jpg"};
								/*dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 1)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else */
								{
								
										dbo.collection("usercar").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("info deleted");
											db.close();
										});
									

						}
						//	}); 
		
						});
					});
				});
			} 
		
		}

else if (action === "/removefavcar4")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"car4.jpg"};
								/*dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 1)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else */
								{
								
										dbo.collection("usercar").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("info deleted");
											db.close();
										});
									

						}
						//	}); 
		
						});
					});
				});
			} 
		
		}	
else if (action === "/removefavcar5")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"car5.jpg"};
								/*dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 1)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else */
								{
								
										dbo.collection("usercar").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("info deleted");
											db.close();
										});
									

						}
						//	}); 
		
						});
					});
				});
			} 
		
		}	

else if (action === "/removefavcar6")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"car6.jpg"};
								/*dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 1)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else */
								{
								
										dbo.collection("usercar").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("info deleted");
											db.close();
										});
									

						}
						//	}); 
		
						});
					});
				});
			} 
		
		}		
else if (action === "/removefavcar7")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"car7.jpg"};
								/*dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 1)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else */
								{
								
										dbo.collection("usercar").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("info deleted");
											db.close();
										});
									

						}
						//	}); 
		
						});
					});
				});
			} 
		
		}	
else if (action === "/removefavcar8")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"car8.jpg"};
								/*dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 1)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else */
								{
								
										dbo.collection("usercar").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("info deleted");
											db.close();
										});
									

						}
						//	}); 
		
						});
					});
				});
			} 
		
		}
else if (action === "/removefavcar9")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"car9.jpg"};
								/*dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 1)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else */
								{
								
										dbo.collection("usercar").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("info deleted");
											db.close();
										});
									

						}
						//	}); 
		
						});
					});
				});
			} 
		
		}			
else if (action === "/removefavcar10")
		{
			console.log("readfavourlist");
			var usernameData = '';
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';          
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
						formData += data;
						console.log("form data="+ formData);
						var obj=JSON.parse(formData);					
						return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
						console.log("read favourite");							
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = {"Email" : splitName[1], "image":"car10.jpg"};
								/*dbo.collection("usercar").countDocuments({"Email" : splitName[1], "image":"car1.jpg"}, function(err, countDocuments){
								console.log(err, countDocuments);
								finalcount = countDocuments;
								if(finalcount > 1)
								{
									if(err) throw err;
									console.log("object exist");
									
								}
								else */
								{
								
										dbo.collection("usercar").remove(myobj, function(err, res) {
											if (err) throw err;
											console.log("info deleted");
											db.close();
										});
									

						}
						//	}); 
		
						});
					});
				});
			} 
		
		}	
else if (action === "/editfavlist2"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1], "description":"The Lamborghini Veneno Spanish pronunciation is a limited-production high-performance sports car manufactured by Italian automobile manufacturer Lamborghini. Based on the Lamborghini Aventador, the Veneno was developed to celebrate Lamborghini's 50th anniversary. It was introduced at the 2013 Geneva Motor Show. When introduced, it had a price of US$4,000,000, making it one of the most expensive production cars in the world. The prototype, Car Zero, is finished in Grigio Telesto (medium grey) and includes an Italian flag vinyl on both sides of the car."};
									var newvalues = { $set: {"description" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		} 
		
else if (action === "/editfavlist"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1], "description":"LaFerrari, project name F150 and unofficially referred to as the Ferrari LaFerrari is a limited production hybrid sports car built by Italian automotive manufacturer Ferrari. LaFerrari means The Ferrari in Italian and some other Romance languages, in the sense that it is the definitive Ferrari. The sports car is the last Ferrari model with a mid-mounted 12-cylinder engine."};
									var newvalues = { $set: {"Email" : splitName[1], "description" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		} 
		
else if (action === "/editfavlist3"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);
						
								
									var myquery = {"Email" : splitName[1], "description":"The McLaren P1 is a limited-production plug-in hybrid sports car produced by British automobile manufacturer McLaren Automotive. Debuted at the 2012 Paris Motor Show, sales of the P1 began in the United Kingdom in October 2013 and all 375 units were sold out by November. Production ended in early December 2015. The United States accounted for 34% of the units and Europe for 26%."};
									var newvalues = { $set: {"Email" : splitName[1], "description" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
else if (action === "/editfavlist4"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "description":"The Apollo Intensa Emozione is a mid-engine sports car manufactured by German automobile manufacturer Apollo Automobil GmbH, designed by their Chief Designer, Joe Wong. The car is sometimes referred to as the IE, which stands for Intensa Emozione. The name itself means 'intense emotion' in Italian. This is the first vehicle made by Apollo since the Gumpert Apollo that went into production 14 years before."};
									var newvalues = { $set: {"Email" : splitName[1], "description" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
else if (action === "/editfavlist5"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "description":"The Pagani Zonda is a mid-engine sports car produced by the Italian sports car manufacturer Pagani. It debuted at the 1999 Geneva Motor Show. By 2018, a total of 140 cars had been built, including development mules. Both 2-door coupé and roadster variants have been produced along with a third new variant being the barchetta. Construction is mainly of carbon fibre."};
									var newvalues = { $set: {"Email" : splitName[1], "description" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
else if (action === "/editfavlist6"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "description":"The Bugatti Veyron EB 16.4 is a mid-engine sports car, designed and developed in Germany by the Volkswagen Group and manufactured in Molsheim, France, by French automobile manufacturer Bugatti. It was named after the racing driver Pierre Veyron. The original version has a top speed of 407 km/h (253 mph). It was named Car of the Decade and best car award (2000–2009) by the BBC television program Top Gear. The standard Bugatti Veyron also won Top Gear's Best Car Driven All Year award in 2005."};
									var newvalues = { $set: {"Email" : splitName[1], "description" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
else if (action === "/editfavlist7"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "description":"The Koenigsegg Agera is a mid-engine sports car produced by Swedish car manufacturer Koenigsegg. It is a successor to the CCX/CCXR. "};
									var newvalues = { $set: {"Email" : splitName[1], "description" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
else if (action === "/editfavlist8"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "description":"The Dodge Viper is a super car that was manufactured by Dodge (SRT for 2013 and 2014), a division of American car manufacturer FCA US LLC from 1991 through 2017, having taken a brief hiatus in 2007 and from 2010–2013. Production of the two-seat super car began at New Mack Assembly Plant in 1991 and moved to Conner Avenue Assembly Plant in October 1995."};
									var newvalues = { $set: {"Email" : splitName[1], "description" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
else if (action === "/editfavlist9"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "description":"The SSC Ultimate Aero is a mid-engined sports car that was produced by SSC North America (formerly known as Shelby SuperCars) from 2006 until 2013. The SSC Ultimate Aero held the title of the fastest production car in the world, according to the Guinness World Records, from 2007 (when it was officially timed at 256.18 mph (412.28 km/h)) until the introduction of the Bugatti Veyron Super Sport in 2010. In April 2013, the Guinness World Records temporarily disqualified the Veyron's record time for a period of five days due to concerns about electronic speed limiting changing the function of the car, but after investigation reinstated the Veyron as the record holder."};
									var newvalues = { $set: {"Email" : splitName[1], "description" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
else if (action === "/editfavlist10"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "description":"The Lykan Hypersport is a Lebanese limited production sports car manufactured by W Motors, a United Arab Emirates based company, founded in 2012 in Lebanon with the collaboration of Lebanese and Italian engineers. It is the first sports car to be designed and produced indigenously in the Middle East."};
									var newvalues = { $set: {"Email" : splitName[1], "description" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
else if (action === "/editfavlist11"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "color":["blue","dark","yellow"]};
									var newvalues = { $set: {"Email" : splitName[1], "color" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
else if (action === "/editfavlist12"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "color":["white","dark","yellow"]};
									var newvalues = { $set: {"Email" : splitName[1], "color" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
else if (action === "/editfavlist13"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "color":["blue","dark","yellow"]};
									var newvalues = { $set: {"Email" : splitName[1], "color" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		else if (action === "/editfavlist14"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "color":["red","dark","yellow"]};
									var newvalues = { $set: {"Email" : splitName[1], "color" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
				else if (action === "/editfavlist15"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "color":["blue","dark","yellow"]};
									var newvalues = { $set: {"Email" : splitName[1], "color" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
						else if (action === "/editfavlist16"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "color":["blue","pink","yellow"]};
									var newvalues = { $set: {"Email" : splitName[1], "color" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
else if (action === "/editfavlist17"){
var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "color":["blue","dark","green"]};
									var newvalues = { $set: {"Email" : splitName[1], "color" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
else if (action === "/editfavlist18"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "color":["blue","dark","yellow"]};
									var newvalues = { $set: {"Email" : splitName[1], "color" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
else if (action === "/editfavlist19"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "color":["blue","dark","green"]};
									var newvalues = { $set: {"Email" : splitName[1], "color" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
else if (action === "/editfavlist20"){
	var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				favlistData = '';
				fav = '';
				return req.on('data', function(data) {
					favlistData += data;
					console.log("favlist data="+ favlistData);
					return req.on('end', function() {
						var favlist;
						favlist = qs.parse(favlistData);
						fav = JSON.stringify(favlist);
						console.log("fav"+fav);
						stringFav = JSON.parse(fav);
						var splitFav = favlistData.split("&");
						console.log("splitFav="+splitFav);
						var tempSplitName = splitFav[1];

						var tempSplitFavlist = splitFav[2];
						
						var splitName = tempSplitName.split("=");
						var splitFavlist = tempSplitFavlist.split("=");
						console.log("mess="+fav);
						
						//console.log("split=" + msg[1]);
							MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							console.log(favlist);														
									var myquery = {"Email" : splitName[1], "color":["blue","dark","green"]};
									var newvalues = { $set: {"Email" : splitName[1], "color" : splitFavlist[1]}};
									dbo.collection("usercar").updateMany(myquery, newvalues, function(err, res) 
									{
									if (err) throw err;
									//dbo.collection("usercar").insertOne({"Email" : splitName[1], "favlist" : splitFavlist[1]}, function(err,favres)
									//{
									console.log("1 document updated");
									db.close();
								});
									
							
							
							
						});
					});
				});
			}
			
		}
		
		
		else if (action === "/findfavourlist")
		{
			console.log("readfavourlist");
			var usernameData = '';
			if (req.method === "POST") {
				console.log("action = post");
				usernameData = '';
				user= '';
				return req.on('data', function(data) {
					usernameData += data;
					console.log("username data="+ usernameData);
					return req.on('end', function() {
						var username;
						username = qs.parse(usernameData);
						user = JSON.stringify(username);
						stringUser = JSON.parse(user);
						var splituser = usernameData.split("&");
						var tempSplitName = splituser[1];
						var splitName = tempSplitName.split("=");
						console.log("mess="+user);
						console.log(tempSplitName);
				console.log("read favourite");
				MongoClient.connect(dbUrl, function(err, db) 
				{
					var finalcount;
					if (err) throw err;
					var dbo = db.db("database");
					dbo.collection("usercar").find({"Email" : splitName[1]}).toArray(function(err, result) 
					{
						if (err) throw err;
					console.log(result);
					db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
            return res.end(resultReturn);
					});
				});
					});
				});
			}
		}
			
						
		else if (action === "/removefavourlist")
		{
			if (req.method === "POST") {
				console.log("action = post");
				delfavData = '';
				delfav = '';
				return req.on('data', function(data) {
					delfavData += data;
					console.log("delfavlist data="+ delfavData);
					return req.on('end', function() {
						var delfavlist;
						delfavlist = qs.parse(delfavData);
						delfav = JSON.stringify(delfavlist);
						console.log("delfav"+delfav);
						stringdelfav = JSON.parse(delfav);
						var splitdelfav = delfavData.split("&");
						console.log("splitdelfav="+splitdelfav);
						var tempSplitName = splitdelfav[1];

						var tempSplitDelfavlist = splitdelfav[2];
						
						var splitName = tempSplitName.split("=");
						var splitDelfavlist = tempSplitDelfavlist.split("=");
						console.log(splitName[1]);
						console.log(splitDelfavlist[1]);
				MongoClient.connect(dbUrl, function(err, db) {
							if (err) throw err;
							var dbo = db.db("database");
				dbo.collection("favlist").remove({"Email" : splitName[1], "favlist" : splitDelfavlist[1]}, function(err, obj)
                {
    				if (err) throw err;
    				console.log("1 document deleted");
    				db.close();
					return res.end("OK");
					});
                
              });
            });
          });
		}
	}	
		else 
		{
      //handle redirect
			if(req.url === "/index")
			{
        if(loginStatus)
				{
					sendFileContent(res, "loginindex.html", "text/html");
				}
				else
				{
					sendFileContent(res, "finalindex.html", "text/html");
				}
			}
		
			else if (req.url === "/Signuppage")
			{
				sendFileContent(res, "signuppage.html", "text/html");
			}
			else if (req.url === "/loginpage")
			{
				sendFileContent(res, "loginpage.html", "text/html");
			}
			else if (req.url === "/logout")
			{
				loginStatus = false;
				loginUser = "";
				sendFileContent(res, "finalindex.html", "text/html");
			}
			else if (req.url === "/hklawprivacy")
			{
				sendFileContent(res, "text_hklawprivacy.html", "text/html");
			}
      else if (req.url === "/protectdata")
			{
				sendFileContent(res, "text_protectdata.html", "text/html");
			}	
	  else if (req.url === "/myfavourlist")
			{
				sendFileContent(res, "myfavourlist.html", "text/html");
			}
	else if (req.url === "/edit1")
			{
				sendFileContent(res, "edit1.html", "text/html");
			}
	else if (req.url === "/member2")
			{
				sendFileContent(res, "member2.html", "text/html");
			}
else if (req.url === "/myapi")
			{
				sendFileContent(res, "api.html", "text/html");
			}

      else if (req.url === "/socialnetwork")
			{
				sendFileContent(res, "text_socialnetwork.html", "text/html");
			}
      else if (req.url === "/favlistpage")
			{
				sendFileContent(res, "favouritelistpage.html", "text/html");
			}else if (req.url === "/abuse")
			{
				sendFileContent(res, "article4.html", "text/html");
			}else if (req.url === "/manage")
			{
				sendFileContent(res, "article3.html", "text/html");
			}else if (req.url === "/use")
			{
				sendFileContent(res, "article2.html", "text/html");
			}else if (req.url === "/food")
			{
				sendFileContent(res, "article1.html", "text/html");
			}
else if(req.url === "/"){
				console.log("Requested URL is url" + req.url);
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.write('<b>testpage</b><br /><br />This is the default response.');
			}	  
			
			
else if (req.url === "/passdata")
			{
			
				
				if (req.method === "POST") 
				{
					console.log("action = post");
					formData = '';
					msg = '';
                   
					return req.on('data', function(data) {
						formData += data;
						console.log("form data="+ formData);
						
						var obj=JSON.parse(formData);
						
			
						
						return req.on('end', function() {
							/////////////////////
                            MongoClient.connect(dbUrl, function(err, db) {
								if (err) throw err;
								var dbo = db.db("database");
								var myobj = [{"image":"car1.jpg","car name":"LaFerrari","color":["blue","dark","yellow"],"price":"$22500000","description":"LaFerrari, project name F150 and unofficially referred to as the Ferrari LaFerrari is a limited production hybrid sports car built by Italian automotive manufacturer Ferrari. LaFerrari means The Ferrari in Italian and some other Romance languages, in the sense that it is the definitive Ferrari. The sports car is the last Ferrari model with a mid-mounted 12-cylinder engine."},
											 {"image":"car2.jpg","car name":"Veneno","color":["white","dark","yellow"],"price":"$45000000", "description":"The Lamborghini Veneno Spanish pronunciation is a limited-production high-performance sports car manufactured by Italian automobile manufacturer Lamborghini. Based on the Lamborghini Aventador, the Veneno was developed to celebrate Lamborghini's 50th anniversary. It was introduced at the 2013 Geneva Motor Show. When introduced, it had a price of US$4,000,000, making it one of the most expensive production cars in the world. The prototype, Car Zero, is finished in Grigio Telesto (medium grey) and includes an Italian flag vinyl on both sides of the car."},
											 {"image":"car3.jpg","car name":"McLaren P1","color":["blue","dark","yellow"],"price":"$12600000","description":"The McLaren P1 is a limited-production plug-in hybrid sports car produced by British automobile manufacturer McLaren Automotive. Debuted at the 2012 Paris Motor Show, sales of the P1 began in the United Kingdom in October 2013 and all 375 units were sold out by November. Production ended in early December 2015. The United States accounted for 34% of the units and Europe for 26%."},
											 {"image":"car4.jpg","car name":"Apollo Intensa Emozione","color":["red","dark","yellow"], "price":"$13800000","description":"The Apollo Intensa Emozione is a mid-engine sports car manufactured by German automobile manufacturer Apollo Automobil GmbH, designed by their Chief Designer, Joe Wong. The car is sometimes referred to as the IE, which stands for Intensa Emozione. The name itself means 'intense emotion' in Italian. This is the first vehicle made by Apollo since the Gumpert Apollo that went into production 14 years before."},
											 {"image":"car5.jpg","car name":"Zonda","color":["blue","dark","yellow"],"price":"$12000000","description":"The Pagani Zonda is a mid-engine sports car produced by the Italian sports car manufacturer Pagani. It debuted at the 1999 Geneva Motor Show. By 2018, a total of 140 cars had been built, including development mules. Both 2-door coupé and roadster variants have been produced along with a third new variant being the barchetta. Construction is mainly of carbon fibre."},
											 {"image":"car6.jpg","car name":"Bugatti Veyron","color":["blue","pink","yellow"],"price":"$25000000","description":"The Bugatti Veyron EB 16.4 is a mid-engine sports car, designed and developed in Germany by the Volkswagen Group and manufactured in Molsheim, France, by French automobile manufacturer Bugatti. It was named after the racing driver Pierre Veyron. The original version has a top speed of 407 km/h (253 mph). It was named Car of the Decade and best car award (2000–2009) by the BBC television program Top Gear. The standard Bugatti Veyron also won Top Gear's Best Car Driven All Year award in 2005."},
											 {"image":"car7.jpg","car name":"Koenigsegg One","color":["blue","dark","green"],"price":"$47000000","description":"The Koenigsegg Agera is a mid-engine sports car produced by Swedish car manufacturer Koenigsegg. It is a successor to the CCX/CCXR. "},
											 {"image":"car8.jpg","car name":"Dodge Viper","color":["blue","dark","yellow"],"price":"$10700000","description":"The Dodge Viper is a super car that was manufactured by Dodge (SRT for 2013 and 2014), a division of American car manufacturer FCA US LLC from 1991 through 2017, having taken a brief hiatus in 2007 and from 2010 to 2013. Production of the two-seat super car began at New Mack Assembly Plant in 1991 and moved to Conner Avenue Assembly Plant in October 1995."},
											 {"image":"car9.jpg","car name":"SSC Ultimate Aero XT","color":["blue","dark","green"],"price":"$50000000","description":"The SSC Ultimate Aero is a mid-engined sports car that was produced by SSC North America (formerly known as Shelby SuperCars) from 2006 until 2013. The SSC Ultimate Aero held the title of the fastest production car in the world, according to the Guinness World Records, from 2007 (when it was officially timed at 256.18 mph (412.28 km/h)) until the introduction of the Bugatti Veyron Super Sport in 2010. In April 2013, the Guinness World Records temporarily disqualified the Veyron's record time for a period of five days due to concerns about electronic speed limiting changing the function of the car, but after investigation reinstated the Veyron as the record holder."},
											 {"image":"car10.jpg","car name":"Lykan hype","color":["blue","dark","green"],"price":"$90000000","description":"The Lykan Hypersport is a Lebanese limited production sports car manufactured by W Motors, a United Arab Emirates based company, founded in 2012 in Lebanon with the collaboration of Lebanese and Italian engineers. It is the first sports car to be designed and produced indigenously in the Middle East."},
											 {"about":"hi"}
									];
						dbo.collection("index").count({"image" : "car1.jpg"}, function(err, count){
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("object exist");
									db.close();
								}
								else
								{
								
										dbo.collection("index").insertMany(myobj, function(err, res) {
											if (err) throw err;
											console.log("info inserted");
											db.close();
										});
									
										//return res.end(msg);
							
								//});
						}
							});
		
						});
					});
				});  
			} 
		} 
	
			
			else if(/^\/[a-zA-Z0-9\/_.-]*.js$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/javascript");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.css$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/css");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.jpg$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/jpg");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.mp4$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/mp4");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.ico$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/ico");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.ttf$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/ttf");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.woff$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/woff");
			}else if(/^\/[a-zA-Z0-9\/_.-]*.png$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/png");
			}else{
				console.log("Requested URL is: " + req.url);
				res.end();
			}
		 }
	});

	server.listen(9999);

	console.log("Server is running，time is" + new Date());


	function sendFileContent(response, fileName, contentType){
		fs.readFile(fileName, function(err, data){
			if(err){
				response.writeHead(404);
				response.write("Not Found!");
			}else{
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
			}
			response.end();
		});
	}
 }).call(this);
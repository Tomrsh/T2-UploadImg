
const firebaseConfig = {
  apiKey: "AIzaSyCgswS8AZObwKQjxZooWWJHf4b1m1rvorA",
  authDomain: "t2upload.firebaseapp.com",
  projectId: "t2upload",
  storageBucket: "t2upload.appspot.com",
  messagingSenderId: "1000887477924",
  appId: "1:1000887477924:web:89ae08b7529893dc2ea831",
  measurementId: "G-JPP8RZP1L4"
};

firebase.initializeApp(firebaseConfig);



var fileText = document.querySelector(".fileText");
var uploadParcentage = document.querySelector(".uploadParcentage");
var progress = document.querySelector(".progress");
var parcentVal;
var fileName;
var fileItem;
var img = document.querySelector(".img")

function getFile(e){
  fileItem = e.target.files[0];
  fileName = fileItem.name;
  fileText.innerHTML = fileName;
}

function uploadImage() {
  
  let storageRef = firebase.storage().ref("images/"+ fileName);
  let uploadTask = storageRef.put(fileItem);
  
  
  uploadTask.on("state_changed", (snapshot)=>{
    console.log(snapshot);
    parcentVal = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
    console.log(parcentVal);
    
    uploadParcentage.innerHTML = parcentVal+"%";
    progress.style.width="100%";
    
  },(error)=>{
    console.log("Error is", error);
  },()=>{
    
    uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
      console.log("URL", url);
      alert("Upload Successfull !");
      if (url!= "") {
        img.setAttribute("src", url);
        img.style.display="block";
      }
      
    })
    
  })
}
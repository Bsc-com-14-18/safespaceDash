import {useState, useEffect} from 'react';
//import firebase from "./firebase";

const Home = () => {
    // const ref = firebase.firestore().collection("cases")
  
    //   const [data,setdata] = useState([])
    //   const [loader, setloader] = useState(true)

    //   function getData() {
    //     ref.onSnapshot((querySnapshot) => {
    //       const items = []
    //       querySnapshot.forEach((doc) => {
    //         items.push(doc.data())
    //       })
    //       setdata(items)
    //       setloader(false)
    //     })
    //   }

    //   useEffect(() => {
    //     getData()
        
    //   })

    return ( 
        <div className="home">
            <h2> Homepage</h2>

            {/* {loader === false && (data.map(dev => {
              return (
                
              <div className='HandlerId' key ={dev.handlerId}>
                  <h1 className='email'> {dev.email}</h1>
                  <p className='name'> {dev.name}</p> 

                  </div>

              )

            }))} */}

        </div>
     );
}
 
export default Home;
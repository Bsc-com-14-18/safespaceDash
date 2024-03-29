import React, {useEffect, useState} from 'react'
import './dashboard.css'
import Sidebar from '../sidebar'
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../../firebase';
import Home from '../../pages/home';
import { Cases } from '../cases/Cases';
import { PieChart } from '../cases/Pie';
import CasesTable from '../analytics/Analytics';
import Table from '../sidebar';

function Dashboard() {
    const [totalCases, setTotalCases] = useState([]);
    const [unresolvedCount, setUnresolvedCount] = useState([]);
    const [resolvedCount, setResolvedCount] = useState([]);

//fetch number of resolved
//fetch unresolved cases
const fetchResolvedCases = async () => {
    try {
      const q = query(collection(db, 'cases'), where('status', '==', 'resolved'));
      const querySnapshot = await getDocs(q);
  
      const resolvedCount = querySnapshot.size;
      // Update the state variable or perform any other necessary action
      setResolvedCount(resolvedCount || 0);
    } catch (error) {
      console.error('Error fetching unresolved cases:', error);
    }
  };

//fetch number of unresolved cases
    const fetchUnresolvedCases = async () => {
        try {
          const q = query(collection(db, 'cases'), where('status', '==', 'not resolved'));
          const querySnapshot = await getDocs(q);
      
          const unresolvedCount = querySnapshot.size;
          // Update the state variable or perform any other necessary action
          setUnresolvedCount(unresolvedCount || 0);
        } catch (error) {
          console.error('Error fetching unresolved cases:', error);
        }
      };
      
  
    const fetchCasesData = async () => {
        try {
          const q = collection(db, 'cases');
          const querySnapshot = await getDocs(q);
      
         
      
          const totalCases = querySnapshot.size;
          // Update the state variable or perform any other necessary action
          setTotalCases(totalCases);
        } catch (error) {
          console.error('Error fetching cases data:', error);
        }
      };

      useEffect(() => {
        fetchResolvedCases()
        fetchUnresolvedCases()
        fetchCasesData();
      }, []);
      
    
  return (
    <section class="dashboard">
        <div class="top">
        <i class="uil uil-bell sidebar-toggle"></i>
            
            <div class="search-box">
                <i class="uil uil-search"></i>
                <input type="text" placeholder="Search here..."/>
            </div>
            
            {/* <!--<img src="images/profile.jpg" alt="">--> */}
        </div>
        <div class="dash-content">
            <div class="overview">
                <div class="title">
                    <i class="uil uil-tachometer-fast-alt"></i>
                    <span class="text">Dashboard</span>
                </div>
                <div class="boxes">
                  <div class="box box1">
                  <i class="uil uil-arrow-down"></i>
                    <span class="text">Total received cases</span>
                    <span class="number">{totalCases}</span>
                    </div>

                    <div class="box box2">
                    <i class="uil uil-comments"></i>
                    <span class="text">unresolved</span>
                    <span class="number">{unresolvedCount}</span>
                    </div>

                    <div class="box box3">
                    <i class="uil uil-check"></i>
                        <span class="text">resoved cases</span>
                        <span class="number">{resolvedCount}</span>
                    </div>
                </div>
            </div>
            <br/>
           
            {/* <Home/> */}
            <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Cases />
      </div>
      <div style={{ flex: 1 }}>
        <PieChart />
      </div>
    </div>
    {/* <CasesTable/> */}
    {/* <Table/> */}

            {/* <div class="activity">
                <div class="title">
                    <i class="uil uil-clock-three"></i>
                    <span class="text">Recent Activity</span>
                </div>
                <div class="activity-data">
                    <div class="data names">
                        <span class="data-title">Name</span>
                        <span class="data-list">Prem Shahi</span>
                        <span class="data-list">Deepa Chand</span>
                        <span class="data-list">Manisha Chand</span>
                        <span class="data-list">Pratima Shahi</span>
                        <span class="data-list">Man Shahi</span>
                        <span class="data-list">Ganesh Chand</span>
                        <span class="data-list">Bikash Chand</span>
                    </div>
                    <div class="data email">
                        <span class="data-title">Email</span>
                        <span class="data-list">premshahi@gmail.com</span>
                        <span class="data-list">deepachand@gmail.com</span>
                        <span class="data-list">prakashhai@gmail.com</span>
                        <span class="data-list">manishachand@gmail.com</span>
                        <span class="data-list">pratimashhai@gmail.com</span>
                        <span class="data-list">manshahi@gmail.com</span>
                        <span class="data-list">ganeshchand@gmail.com</span>
                    </div>
                    <div class="data joined">
                        <span class="data-title">Joined</span>
                        <span class="data-list">2022-02-12</span>
                        <span class="data-list">2022-02-12</span>
                        <span class="data-list">2022-02-13</span>
                        <span class="data-list">2022-02-13</span>
                        <span class="data-list">2022-02-14</span>
                        <span class="data-list">2022-02-14</span>
                        <span class="data-list">2022-02-15</span>
                    </div>
                    <div class="data type">
                        <span class="data-title">Type</span>
                        <span class="data-list">New</span>
                        <span class="data-list">Member</span>
                        <span class="data-list">Member</span>
                        <span class="data-list">New</span>
                        <span class="data-list">Member</span>
                        <span class="data-list">New</span>
                        <span class="data-list">Member</span>
                    </div>
                    <div class="data status">
                        <span class="data-title">Status</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                    </div>
                </div>
            </div> */}
           
        </div>
    </section>

  )
}

export default Dashboard

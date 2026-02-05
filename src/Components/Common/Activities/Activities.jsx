import "./Activities.scss"
// import client from "../../../Assets/Common/client.svg"
import client1 from "../../../Assets/Icons/icon1.png"
import client2 from "../../../Assets/Icons/icon2.png"
import client3 from "../../../Assets/Icons/icon3.png"
import client4 from "../../../Assets/Icons/icon4.png"
import client5 from "../../../Assets/Icons/icon5.png"
import client6 from "../../../Assets/Icons/icon6.png"
import client7 from "../../../Assets/Icons/icon7.png"
import client8 from "../../../Assets/Icons/icon8.png"
import client9 from "../../../Assets/Icons/icon9.png"
import client10 from "../../../Assets/Icons/icon10.png"
import client11 from "../../../Assets/Icons/icon11.png"
import client12 from "../../../Assets/Icons/icon12.png"
import client13 from "../../../Assets/Icons/icon13.png"
import client14 from "../../../Assets/Icons/icon14.png"
import client15 from "../../../Assets/Icons/icon15.png"
import client16 from "../../../Assets/Icons/icon16.png"
import client17 from "../../../Assets/Icons/icon17.png"
import client18 from "../../../Assets/Icons/icon18.png"
import client19 from "../../../Assets/Icons/icon19.png"
import client20 from "../../../Assets/Icons/icon20.png"
import client21 from "../../../Assets/Icons/icon21.png"
import client22 from "../../../Assets/Icons/icon22.png"

// import client9 from "../../../Assets/Clients/vincent.png"

import bg from "../../../Assets/Banner/line-vector.svg"

const activities = [
    {
        id: 1,
        name: "Aqua Dome",
        image: client1
    },
    {
        id: 2,
        name: "Lagoon Tour in Hammock",
        image: client2
    },
    {
        id: 3,
        name: "Tortios Garden",
        image: client3
    },
    {
        id: 4,
        name: "Wedding Venue",
        image: client4
    },
    {
        id: 5,
        name: "Iguanas Park & Fruit Market",
        image: client5
    },
    {
        id: 6,
        name: "Lagoon Waterfalls",
        image: client6
    },
    {
        id: 7,
        name: "Mini Golf Island",
        image: client7
    },
    {
        id: 8,
        name: "Central Hub Fountain",
        image: client8
    },
    {
        id: 9,
        name: "Yoga and Clistanic Park",
        image: client9
    },
    {
        id: 10,
        name: "Jungle River",
        image: client10
    },
    {
        id: 11,
        name: "Zipline",
        image: client11
    },
    {
        id: 12,
        name: "Yoga Floating Decks",
        image: client12
    },
    {
        id: 13,
        name: "Rapids",
        image: client13
    },
    {
        id: 14,
        name: "Wildlife Parks",
        image: client14
    },
    {
        id: 15,
        name: "Aqua Park",
        image: client15
    },
    {
        id: 16,
        name: "Jungle Swings",
        image: client16
    },
    {
        id: 17,
        name: "Water Platforms",
        image: client17
    },
    {
        id: 18,
        name: "Private Boat Rides",
        image: client18
    },
    {
        id: 19,
        name: "Hot Springs Spa",
        image: client19
    },
    {
        id: 20,
        name: "Parrot Park",
        image: client20
    },
    {
        id: 21,
        name: "Fitness Park",
        image: client21
    },
    {
        id: 22,
        name: "Paddling (Gondola Style)",
        image: client22
    }
];

export default function Activities() {
    return (
        <section>
            <div className="clients-section section-container">
                <img className="bg-img" src={bg} alt="Client Image" />
                <div className="head-div">
                    <h2 className="main-title">DAMAC Islands Phase 2 Activities</h2>
                </div>

                <div className="clients-grid">
                    {activities.map((ele) => {
                        return (
                            <div key={ele.id} className="client-card">
                                <img className="image" src={ele.image} alt={ele.name} />
                                <p className="description">{ele.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
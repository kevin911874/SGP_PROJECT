import React from 'react';

interface Event {
    id: string;
    title: string;
    month: string;
    location: string;
    description: string;
    image_url: string; // URL for the event image
}

const LiveEvents = () => {
    // Static list of events
    const events: Event[] = [
        {
            id: '1',
            title: 'Holi Festival',
            month: 'March',
            location: 'Vraj, India',
            description: 'Join us for a vibrant celebration of Holi with music, dance, and colors!',
            image_url: '../download_4.jpg',
        },
        {
            id: '2',
            title: 'Pongal Festival',
            month: 'January',
            location: 'Tamil Nadu, India',
            description: 'Celebrate the harvest festival with traditional food and festivities.',
            image_url: 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/pongal-1657804552_e081a6372fa444e944f1.webp',
        },
        {
            id: '3',
            title: 'Diwali Mela',
            month: 'October',
            location: 'Delhi, India',
            description: 'Experience the grand Diwali fair with food stalls, games, and fireworks.',
            image_url: '../download_6.jpg',
        },
        {
            id: '4',
            title: 'Durga Puja',
            month: 'October',
            location: 'Kolkata, India',
            description: 'Witness the grand celebration of Durga Puja with cultural performances and rituals.',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXHDAJaI5qosuadX3AN0FEaiS1DSnXrddRbA&s',
        },
        {
            id: '5',
            title: 'Navratri Festival',
            month: 'September',
            location: 'Gujarat, India',
            description: 'Participate in nine nights of dance and devotion during Navratri.',
            image_url: 'https://travelseewrite.com/wp-content/uploads/2019/10/6F8A2202-min.jpg',
        },
        {
            id: '6',
            title: 'Baisakhi Festival',
            month: 'April',
            location: 'Punjab, India',
            description: 'Celebrate the harvest festival with traditional music and dance.',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTlx3h4tkmjpGL6YLVvlVmHuQJ8Fq6_sWUdg&s',
        },
        {
            id: '7',
            title: 'Onam Festival',
            month: 'August',
            location: 'Kerala, India',
            description: 'Experience the vibrant Onam celebrations with traditional feasts and boat races.',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvA-R2wKhqodZbwS6Vq0kLCChk4-wqETHrEsnIoa6u6cHX78cocW01LTYN3VhOdcnGqlY&usqp=CAU',
        },
        {
            id: '8',
            title: 'Kumbh Mela',
            month: 'January',
            location: 'Prayagraj, India',
            description: 'Join millions in the largest religious gathering in the world.',
            image_url: 'https://cdnbbsr.s3waas.gov.in/s3cd4bb35c75ba84b4f39e547b1416fd35/uploads/2021/07/2021071395-1024x683.jpg',
        },
        {
            id: '9',
            title: 'Goa Carnival',
            month: 'February',
            location: 'Goa, India',
            description: 'Enjoy the vibrant festivities of the Goa Carnival with parades and music.',
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyHqXNxeZgHWIfMZjqKOnMg2hQkfDBe9kKQDYGkSmyMWEZiicaObMgF0Nj5YpnicN0wTI&usqp=CAU',
        },
        {
            id: '10',
            title: 'Rath Yatra',
            month: 'July',
            location: 'Puri, India',
            description: 'Witness the grand procession of Lord Jagannath during Rath Yatra.',
            image_url: 'https://www.financialexpress.com/wp-content/uploads/2020/06/6-7.jpg',
        },
        {
            id: '11',
            title: 'Maha Shivaratri',
            month: 'March',
            location: 'Varanasi, India',
            description: 'Celebrate the night of Lord Shiva with prayers and rituals.',
            image_url: 'https://as2.ftcdn.net/v2/jpg/11/53/30/45/1000_F_1153304587_6jQBffsG2ck2QOipsg5vrd0lxNtbOK9R.jpg',
        },
        {
            id: '12',
            title: 'Bihu Festival',
            month: 'April',
            location: 'Assam, India',
            description: 'Celebrate the Assamese New Year with traditional dance and music.',
            image_url: 'https://www.bihufestival.org/img/Bihu-mobile-inner-banner.jpg',
        },
        {
            id: '13',
            title: 'Chhath Puja',
            month: 'November',
            location: 'Bihar, India',
            description: 'Worship the Sun God with rituals and offerings during Chhath Puja.',
            image_url: 'https://t4.ftcdn.net/jpg/08/42/21/53/360_F_842215300_MnOJ8uCSFeT4qiXsqJ0G5Z6yT6tqNVRx.jpg',
        },
        {
            id: '14',
            title: 'Gudi Padwa',
            month: 'March',
            location: 'Maharashtra, India',
            description: 'Celebrate the Marathi New Year with traditional festivities.',
            image_url: 'https://img.freepik.com/free-vector/happy-gudi-padwa-festival-celebration-greeting-background-vector_1055-12888.jpg',
        },
        {
            id: '15',
            title: 'Hemis Festival',
            month: 'July',
            location: 'Ladakh, India',
            description: 'Experience the vibrant Hemis Festival with traditional dances and rituals.',
            image_url: 'https://www.csp.indica.in/wp-content/uploads/2022/08/fi-700x394.png',
        },
        {
            id: '16',
            title: 'Kite Festival',
            month: 'January',
            location: 'Ahmedabad, India',
            description: 'Join the excitement of kite flying during the International Kite Festival.',
            image_url: 'https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/01/08/Pictures/india-international-kite-festival_c26f85a8-f430-11e7-b42e-2d533d154b0f.jpg',
        },
        {
            id: '17',
            title: 'Sankranti Festival',
            month: 'January',
            location: 'Various Locations, India',
            description: 'Celebrate the harvest festival with traditional sweets and kite flying.',
            image_url: 'https://www.kutchtourguide.com/blog/wp-content/uploads/2015/01/kite_Festival.jpg',
        },
        {
            id: '18',
            title: 'Buddha Purnima',
            month: 'May',
            location: 'Bodh Gaya, India',
            description: 'Celebrate the birth of Lord Buddha with prayers and rituals.',
            image_url: 'https://static.punjabkesari.in/multimedia/08_44_431835380statue-of-mahatma-buddha.jpg',
        },
        {
            id: '19',
            title: 'Christmas Celebration',
            month: 'December',
            location: 'Goa, India',
            description: 'Experience the festive spirit of Christmas with celebrations and decorations.',
            image_url: 'https://imgmediagumlet.lbb.in/media/2023/12/65784fd1d97e2f4135ac89a3_1702383569321.jpg',
        },
        {
            id: '20',
            title: 'International Yoga Day',
            month: 'June',
            location: 'Rishikesh, India',
            description: 'Join the global celebration of yoga with various events and workshops.',
            image_url: 'https://dvmfnr63mjxs9.cloudfront.net/wp-content/uploads/2019/06/28171947/idy2019.jpg',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 py-10"> {/* Changed background color */}
            <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-lg"> {/* Increased padding */}
                <h2 className="text-4xl font-bold text-center mb-8 text-black">Live Events in India</h2> {/* Increased font size */}
                {events.length === 0 ? (
                    <p className="text-center text-gray-500">No live events found.</p>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Changed to grid layout */}
                        {events.map((event) => (
                            <li key={event.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-md flex flex-col bg-white hover:shadow-lg transition-shadow duration-300">
                                <div className="overflow-hidden transition-transform duration-300 transform hover:scale-105"> {/* Added hover effect */}
                                    {event.image_url && (
                                        <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />
                                    )}
                                </div>
                                <div className="p-4 flex-grow">
                                    <h3 className="font-semibold text-xl text-gray-800">{event.title}</h3>
                                    <p className="text-gray-600">{event.month}</p>
                                    <p className="text-gray-600">{event.location}</p>
                                    <p className="mt-2 text-gray-700">{event.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default LiveEvents;
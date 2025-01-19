import api from "../api.js";
import {useEffect, useState} from "react";

function HomePage() {
    const [data, setData] = useState([]);
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    const handleRequest = async () => {
        const response = await api.get("/api/professions/");
        return response.data;
    };

    useEffect(() => {
        handleRequest()
            .then(r => {
                console.log(r);
                setData(r);
            })
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    return (
        <>
            {data.map((item, index) => (
                <div key={index}>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                </div>
            ))}
        </>
    );
}

export default HomePage;

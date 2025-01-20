import api from "../api.js";
import {useEffect, useState} from "react";
import Parser from "html-react-parser";

function GeographyPage() {
    const [data, setData] = useState([]);

    const handleRequest = async () => {
        const response = await api.get("/api/geography-statistics/");
        return response.data;
    };

    useEffect(() => {
        handleRequest()
            .then(r => {
                setData(r);
            })
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    return (
        <>
            {data.map((item, index) => (
                <section key={index}>
                    {/*<h1 className="text-5xl pb-2">{item.name}</h1>*/}
                    <p>{Parser(item.description)}</p>
                    <div className="flex mt-3 justify-center flex-wrap md:flex-nowrap md:justify-normal">
                        {item.images.map((image, index) => (
                            <img className="w-96 mt-4 md:mr-4 md:mt-0" key={index} src={image.image} alt={item.name}/>
                        ))}
                    </div>
                </section>
            ))}
        </>
    );
}

export default GeographyPage;

import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Trending.css';
import CustomPagination from "../../components/Pagination/CustomPagination";
import apikey from "../../Dataa/config";

const Trending = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    console.log(process.env);
    const fetchTrending = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/week?api_key=${apikey}&page=${page}`
        );

        setContent(data.results);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchTrending();
        // eslint-disable-next-line
    }, [page]);

    return (
        <div>
            <span className="pageTitle">Trending Today</span>
            <div className="trending">
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={c.media_type}
                            vote_average={c.vote_average}
                        />
                    ))}
            </div>
            <CustomPagination setPage={setPage} />
        </div>
    );
};

export default Trending;
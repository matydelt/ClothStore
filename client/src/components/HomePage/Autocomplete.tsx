import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import { Link } from "react-router-dom";

interface searchedText {
    _id: string,
    name: string
}

export default function Autocomplete({ text }: any) {

    const [searchedTexts, setSearchedTexts] = React.useState<searchedText[]>([]);

    React.useEffect(() => {
        axios.get('/autocomplete', { params: { text } }).then(({ data }) => {
            setSearchedTexts(data);
        });
    }, [text]);


    return (<>
        {text &&
            <Box boxShadow={5} sx={{ position: 'absolute', zIndex: 5000, backgroundColor: 'white', width: '17rem' }}>
                {searchedTexts?.map(st => {
                    return <Link style={{ textDecoration: 'none', color: 'black' }} to={`/publication/${st._id}`}>
                        <MenuItem key={st._id} value={st._id}>{st.name}</MenuItem>
                    </Link>
                })
                }
            </Box>
        }
    </>);
}



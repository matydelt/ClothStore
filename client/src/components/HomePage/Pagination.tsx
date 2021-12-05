import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { putPublications } from "../../redux/actions/publicationActions";
import  Stack  from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/system";

function Paginations() {  

  const { 
    mark,
    gender,
    category,
    price,
    author,
    name,
    order,
    page,
    count
  } = useSelector(
    (state: RootState) => state.publicationList
  );

  const dispatch = useDispatch();

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(
      putPublications({
        name: name,
        order: order,
        page: `${page}`,
        mark: mark,
        category: category,
        gender: gender,
        price: price,
        author: author,
      })
    );
  };
  let pag:number = Math.ceil(count/12);
  return (
    <Box
      component="aside"
      sx={{
        width: "100%",
        marginTop: "20px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center"
      }}
    >
    <Stack>
      <Pagination count={pag} variant="outlined" color="primary" showFirstButton showLastButton onChange={handleChange} />
    </Stack>
    </Box>
    );
}

export default Paginations;

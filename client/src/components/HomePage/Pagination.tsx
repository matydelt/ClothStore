import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { putPublications } from "../../redux/actions/publicationActions";
import  Stack  from "@mui/material/Stack";
import Pagination from "@material-ui/lab/Pagination";

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
    <Stack spacing={4}>
      <Pagination count={pag} variant="outlined" color="primary" showFirstButton showLastButton onChange={handleChange} />
    </Stack>);
}

export default Paginations;

import { Box, Button, Modal } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import ModalShopping from "./ModalShopping";
import ReviewForm from "./reviewForm/ReviewForm";

interface Propiedades {
  articulos: any[];
  esventa: boolean;
  userId?: string | undefined;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function ModalDetailsShopping(props: Propiedades) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { articulos, esventa } = props;

  return (
    <div>
      <Button onClick={handleOpen}>Detalle de compra</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Foto</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Reseña</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articulos.map((a) => (
                  <TableRow
                    key={a._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Avatar alt={a.title} src={a.image} />
                    </TableCell>
                    <TableCell align="right">{a.title}</TableCell>
                    <TableCell align="right">{a.price}</TableCell>
                    <TableCell align="right">{a.quantity}</TableCell>
                    <TableCell align="right">
                      <ModalShopping id={a.publication} />
                    </TableCell>
                    {esventa && (
                      <TableCell>
                        <ReviewForm
                          publicationId={a.publication}
                          userId={props.userId}
                        ></ReviewForm>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
}

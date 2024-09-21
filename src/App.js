import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct, reduceStock,increaseStock } from "./slices/StockSlice";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  Box,
  InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, "Ürün adı gereklidir"),
  stock: z.string().min(1, "Stok miktarı en az 1 olmalıdır"),
});

function App() {
  const products = useSelector((state) => state.stock.products);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const defaultValues = { name: "", stock: 0 };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
  console.log(errors, "error");

  const onAddProduct = (data) => {
    console.log("data", data);
    dispatch(addProduct({ id: products.length + 1, ...data }));
    reset();
  };

  const onRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  const onReduceStock = (id, quantity) => {
    dispatch(reduceStock({ id, quantity }));
  };
  const onIncreaseStock = (id, quantity) => {
    dispatch(increaseStock({ id, quantity }));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <h1>Material Stock</h1>
      <TextField
        label="SEARCH"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <form onSubmit={handleSubmit(onAddProduct)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="ADD MATERIAL"
              variant="outlined"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          name="stock"
          control={control}
          render={({ field }) => (
            <TextField
              label="Stock"
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Button variant="contained" color="primary" type="submit" >
          ADD PRODUCT
        </Button>
      </form>

      <List>
        {filteredProducts.reverse().map((product) => (
          <ListItem key={product.id} divider>
            <ListItemText
              primary={product.name}
              secondary={`Stok: ${product.stock}`}
            />
            <Box sx={{display:"flex",flexDirection:"column" ,alignItems:"center",marginRight:"1rem"}}>
              <InputLabel  sx={{ fontSize: "0.8rem",color:"white",backgroundColor:"green",padding:".3rem",fontWeight:"700" }}>
                ADD PRODUCT
              </InputLabel>

              <Select
                value={""}
                onChange={(e) => onIncreaseStock(product.id, e.target.value)}
                label="Select Number"
                size="small"
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <MenuItem key={item} value={item} sx={{marginX:"20px"}}>
                    +{item}
                  </MenuItem>
                ))}
              </Select>
              </Box>
            <Box sx={{display:"flex",flexDirection:"column" ,alignItems:"center"}}>
              <InputLabel size="normal" sx={{ fontSize: "0.8rem",color:"white",fontWeight:"700",backgroundColor:"red",padding:".3rem" }}>
                SINGLE SALE
              </InputLabel>

              <Select
                value={""}
                onChange={(e) => onReduceStock(product.id, e.target.value)}
                label="Select Number"
                size="small"
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <MenuItem key={item} value={item}>
                    -{item}
                  </MenuItem>
                ))}
              </Select>
              </Box>
              <Button
                sx={{ ml: 4, fontSize: "0.8rem", padding: "6px 12px" }}
                variant="contained"                
                onClick={() => onRemoveProduct(product.id)}
              >
                REMOVE ALL
              </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;

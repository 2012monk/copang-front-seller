import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// 셀러 상품조회 API : api/seller/items



const ListProduct = (props) => {

    const [list, setList] = useState();
    const [refresh, setRefresh] = useState(0);

    useEffect( () => {
        const axiosGetList = async () => {
            const result = await axios.get("https://alconn.co/api/seller/items");
            console.log(result.data);
            setList(result.data.data.list);
        }
        axiosGetList();
    },[refresh])

    const deleteProduct = (itemId) => {
        const axiosDeleteProduct = async () => {
            const result = await axios.delete("https://alconn.co/api/item/delete/"+itemId);
            console.log(result);
        }
        axiosDeleteProduct();
        setRefresh(prev => prev+1);
    }

    return (
        <div>
            <br/><br/><br/>
   
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            상품ID
                        </TableCell>
                        <TableCell>
                            상품명
                        </TableCell>
                        <TableCell>
                            상품가격
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    list && list.map( (row,idx,data) => 
                        <TableRow>
                            <TableCell>
                                {row.itemId}
                            </TableCell>
                            <TableCell>
                                {row.itemName}
                            </TableCell>
                            <TableCell>
                                {row.price}
                            </TableCell>
                            <TableCell>
                                <button onClick={()=>props.history.push("/updateproduct",row.itemId)} className="btn btn-primary">
                                    수정
                                </button>
                                &nbsp;&nbsp;
                                <button onClick={()=>deleteProduct(row.itemId)} className="btn btn-primary">
                                    삭제
                                </button>
                            </TableCell>
                        </TableRow>
                    )
                }
                </TableBody>
            </Table>
        </div>
    );
};

export default ListProduct;
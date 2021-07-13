import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BusinessIcon from "@material-ui/icons/Business";


const ReplyReview = () => {
    const [refresh, setRefresh] = useState(0);
    const onClickReply = (idx, row) => {
        Question[idx].check = !Question[idx].check
        setRefresh(prev => prev + 1)
        console.log(Question[idx].check)

    }

    useEffect(() => { }, [refresh]);

    const [replyContent, setReplyContent] = useState("");
    // const [replyContent, setReplyContent] = useState({
    //     replyContent: "",
    // });

    const handleChange3 = (e) => {
        setReplyContent(e.target.value);
        // setReplyContent({ replyContent, [name]: value });
    };

    const [Question, setQuestion] = useState([]);
    useEffect(()=>{
        const Questionres = async () => {
            const result = await axios.get(
                "https://alconn.co/api/inquiry/seller"
            );
            for (let i = 0; i < result.data.data.length; i++) {
                result.data.data[i].check = false;
            }
            setQuestion(result.data.data);
        };
        Questionres();
    },[])
    

    const addReply = (idx) => {
        const axiosAddReply = async () => {
            const replyData = {
                "inquiry": Question[idx].inquiryId,
                "content": replyContent,
            }
            await axios.post("https://alconn.co/api/inquiry/" + Question[idx].inquiryId + "/reply", replyData);
            const result = await axios.get("https://alconn.co/api/inquiry/seller");
            setQuestion(result.data.data);
            setRefresh(prev => prev + 1)
        }
        axiosAddReply();

        alert("답변등록이 되었습니다.");

    }
    return (
        <div style={{marginTop:'8%'}}><span style={{fontWeight:'bold', fontSize:'20pt'}}>문의 관리</span>
            {
                Question && Question.map((row, idx) => {
                    return (
                        <div key={idx} row={row}>
                            <div style={{ height: '100px'}}>
                                <div style={{ float: 'left', fontWeight: 'bold'}}>
                                    <span style={{ border: '1px solid #777777', color: 'white', backgroundColor: '#777777' }}>질문</span>&nbsp;
                                    <span><AccountCircleIcon />{row.clientName}</span>
                                </div>
                                <span style={{ float: 'right', color: '#777777' }}>{row.registerDate}</span>
                                <div style={{ color: '#777777', borderTop: '1px solid #777777' }}>
                                    &nbsp;&nbsp;({row.itemName} | {row.optionName} : {row.optionValue})
                                </div><br></br>
                                <span style={{ width: '100%', height: '20px' }}>{row.content}</span>
                            </div>
                            <div><button onClick={() => onClickReply(idx, row)} style={{ border: 'none', backgroundColor: 'white', color: '#346AFF' }} >답글달기</button></div>
                            {
                                row.check ? <div><textarea name="replyContent" onChange={handleChange3} ></textarea><button onClick={() => addReply(idx)} style={{ border: 'none', backgroundColor: 'white', color: '#346AFF' }}>답글등록</button></div> : null
                            }
                            {row.reply && (
                                <div style={{ borderTop: '1px solid #777777', backgroundColor: 'rgb(250, 248, 248)' }}>
                                    <br></br>
                                    <strong>
                                        <span
                                            style={{
                                                backgroundColor: "#346AFF",
                                                color: "white",
                                            }}
                                        >
                                            답글
                                        </span>
                                        &nbsp;<BusinessIcon></BusinessIcon>&nbsp;
                                        {row.reply.sellerName}
                                    </strong>
                                    <span style={{ float: 'right' }}>
                                        {row.reply.registerDate}
                                    </span>
                                    <br />
                                    <br />
                                    <div>{row.reply.content}</div>
                                    <br />
                                </div>
                            )}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ReplyReview;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Option.css";
// import Option from "./Option";
//import DisplayProductName from "./DisplayProductName";
// import ImgUpload from "./ImgUpload";
// import WriteProductDetail from "./WriteProductDetail";
// import NewProductConfirmButton from "./NewProductConfirmButton";
//import AddNewCategoryForm from "./AddNewCategoryForm";

//import AddNewCategoryForm from "./AddNewCategoryForm";

const AddNewProductApp = () => {
  //=============== Image and setImg function ==============//

  const [refresh, setRefresh] = useState(0);
  const [mainImg, setMainImg] = useState(null);
  const [mainImgSrc, setMainImgSrc] = useState("");

  const mainImageChange = async (file, idx) => {
    productData.itemDetailFormList[idx].mainImgShow = URL.createObjectURL(file);
    //setMainImg(file);
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post("https://alconn.co/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    productData.itemDetailFormList[idx].mainImg = res.data.data.publicPath;
    //console.log(file);
    console.log(res);
    setMainImgUrl(res.data.data.publicPath);
    console.log(res.data.data.publicPath);
    setIdx(idx);
    setRefresh((prev) => prev + 1);
    console.log("이미지 업로드 직후 옵션인포 확인");
    console.log(optionInfo);
  };

  const [subImg, setSubImg] = useState(null);
  const [subImgSrc, setSubImgSrc] = useState("");
  const subImageChange = (e) => {
    setSubImg(e.target.files[0]);
    setSubImgSrc(e.target.files[0].name);
    setOptionInfo({ ...optionInfo, subImgSrc });
  };

  //=============== Image URL and set function ==============//
  const [mainImgUrl, setMainImgUrl] = useState("");
  const [subImgUrl, setSubImgUrl] = useState();

  const [idx, setIdx] = useState();

  const mainImageUpload = async (idx) => {
    console.log(`mainImg is = ${mainImg}`);

    console.log(mainImgUrl);
  };

  // useEffect(() => {
  //   if (mainImgUrl === "") {
  //     return;
  //   } else {
  //     console.log(mainImgUrl);
  //     productData.itemDetailFormList[idx].mainImg = mainImgUrl;
  //   }
  // }, [mainImgUrl]);

  const subImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", subImg);
    const res = await axios.post("https://alconn.co/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    setSubImgUrl(res.data.data.publicPath);
  };

  //=============== Changing the product name ==============//
  const [product, setProduct] = useState({
    itemName: "",
    itemComment: "",
    categoryId: "",
    brand: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(e.target);
    const test = {
      ...product,
      [name]: value,
    };
    //console.log(test);
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  //=============== Changing product's other properties ==============//
  const [optionInfo, setOptionInfo] = useState({});
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    //console.log(e.target);
    //console.dir(productData);
    setOptionInfo({
      ...optionInfo,
      [name]: value,
      mainImgShow: null,
      mainImg: null,
    });
  };

  useEffect(() => {
    //console.log("옵션인포 변경됨");
    console.log(optionInfo);
  }, [optionInfo]);

  const [shipmentInfoForm, setShipmentInfoForm] = useState({
    logisticCompany: "",
    shippingChargeType: "",
    freeShipOverPrice: 0,
    releaseDate: 0,
    shippingPrice: 0,
  });
  const shippingHandleChange = (e) => {
    const { name, value } = e.target;
    //console.log(shipmentInfoForm);
    //setShipmentInfoForm({ ...shipmentInfoForm, [name]: value });
    setProductData({
      ...productData,
      shipmentInfoForm: {
        ...productData.shipmentInfoForm,
        [name]: value,
      },
    });
    setRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    console.log(shipmentInfoForm);
  }, [shipmentInfoForm]);
  //=============== THE MAIN DATA TO SEND TO THE SERVER ==============//

  const [productData, setProductData] = useState({
    itemName: product.itemName,
    itemComment: product.itemComment,
    categoryId: product.categoryId,
    brand: product.brand,
    itemDetailFormList: [],
    shipmentInfoForm: {},
  });

  useEffect(() => {}, [productData]);

  const addProduct = () => {
    const axiosAddProduct = async () => {
      await axios.post("https://alconn.co/api/item/add", productData);
      //=============================================================================================================//
      //======================상품이 성공적으로 등록되면 메인 창으로 이동 하도록 코드 입력!!!!!!!!!!!!!==================//
      //=============================================================================================================//
    };
    axiosAddProduct();
    //mainImageUpload();
    consoleLog();
    //subImageUpload();
    alert("상품이 등록되었습니다.");
  };

  // const [optionName, setOptionName] = useState();
  // const [optionValue, setOptionValue] = useState();
  // const [singleOptionValue, setSingleOptionValue] = useState([]);
  // const [optionList, setOptionList] = useState([]);

  // const handleChangeName = (e) => {
  //   setOptionName(e.target.value);
  // };

  // const handleChangeValue = (e) => {
  //   setOptionValue(e.target.value);
  // };

  const consoleLog = () => {
    console.log(productData);
  };

  const clickAddToList = () => {
    //console.log(DetailList);
    // console.log(`optionName: ${optionName} & optionValue: ${optionValue}`);
    // const valueSplit = product2.optionValue.split(",");
    // setSingleOptionValue(Object.keys(valueSplit).map((key) => valueSplit[key]));
    // console.log(optionList);
    console.log("productData 확인");
    console.log(productData);
    console.log("옵션인포 확인");


    console.log(optionInfo);
    setProductData({
      ...productData,
      itemDetailFormList: [
        ...productData.itemDetailFormList,
        { ...optionInfo },
      ],
    });
    document.getElementById("optionName").value = "";
    document.getElementById("optionValue").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stockQuantity").value = "";

    //console.log(productData.itemDetailFormList);
    setRefresh((prev) => prev + 1);
  };

  // const clickDeleteOption = () => {
  //   setSingleOptionValue([]);
  //   setOptionValue("");
  //   setOptionName("");
  // };

  const logisticsList = [];

  /////////////////////////////////////대분류 변수////////////////////////////////////////
  const [largeCategory, setLargeCategory] = useState([]);
  const [selectedLC, setSelectedLC] = useState([]);

  /////////////////////////////////////중분류 변수////////////////////////////////////////
  const [mediumCategory, setMediumCategory] = useState([]);
  const [selectedMC, setSelectedMC] = useState([]);

  /////////////////////////////////////소분류 변수////////////////////////////////////////
  const [smallCategory, setSmallCategory] = useState([]);
  const [selectedSC, setSelectedSC] = useState([]);

  const largeCategorySelect = (e) => {
    setMediumCategory(JSON.parse(e.target.value).cildCategory);
    setRefresh((prev) => prev + 1);
    setSmallCategory("");
    productData.categoryId = JSON.parse(e.target.value).categoryId;
    setRefresh((prev) => prev + 1);
    console.log(productData.categoryId);
  };

  const mediumCategorySelect = (e) => {
    setSmallCategory(JSON.parse(e.target.value).cildCategory);
    setRefresh((prev) => prev + 1);
    productData.categoryId = JSON.parse(e.target.value).categoryId;
    setRefresh((prev) => prev + 1);
    console.log(productData.categoryId);
  };

  const smallCategorySelect = (e) => {
    setRefresh((prev) => prev + 1);
    productData.categoryId = JSON.parse(e.target.value).categoryId;
    setRefresh((prev) => prev + 1);
    console.log(productData.categoryId);
  };
  useEffect(() => {
    console.log(productData.itemDetailFormList);

    const readAllCategory = async () => {
      const result = await axios.get("https://alconn.co/api/category/list");
      //console.log(result);

      setLargeCategory(result.data.data.cildCategory);
      // setMediumCategory(result.data.data.cildCategory[0].cildCategory);
      // setSmallCategory(
      //   result.data.data.cildCategory[0].cildCategory[0].cildCategory
      // );
      //console.log(largeCategory);
    };

    readAllCategory();
  }, [refresh]);
  return (
    <div>
      {/* <AddNewCategoryForm /> */}

      {/* ############################### 상품명 입력 부분 ################################ */}
      {/* ############################################################################################ */}
      <div className="container-fluid" style={{ marginTop: "30px" }}>
        <div className="jumbotron">
          <div className="row" style={{ marginBottom: "30px" }}>
            <h2>노출상품명 / 브랜드</h2>
          </div>
          <label htmlFor="itemName" style={{ color: "dodgerblue" }}>
            실제 판매 페이지에 노출되는 상품명입니다
          </label>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="노출상품명을 입력하세요"
                id="itemName"
                name="itemName"
                required="required"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <label htmlFor="brand" style={{ color: "dodgerblue" }}>
            브랜드명 입력란입니다
          </label>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="브랜드을 입력하세요"
                id="brand"
                name="brand"
                required="required"
                onChange={handleChange}
              ></input>
            </div>
          </div>
        </div>
      </div>
      {/* ############################### 카테고리 출력 부분 ################################ */}
      {/* ############################################################################################ */}
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row" style={{ marginBottom: "30px" }}>
            <h2>카테고리</h2>
          </div>
          <div className="row">
            <div className="col-2">
              <select
                className="custom-select"
                id="largeCategoryForm"
                name="largeCategory"
                onChange={(e) => largeCategorySelect(e)}
              >
                <option selected>카테고리 선택</option>
                {largeCategory.map((entry, idx) => {
                  return (
                    <option
                      key={entry.categoryId}
                      value={JSON.stringify(entry)}
                      name="largeCategory"
                    >
                      {entry.categoryName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-2" id="mediumCategorySection">
              {mediumCategory.length !== 0 ? (
                <select
                  className="custom-select"
                  id="mediumCategoryForm"
                  name="mediumCategory"
                  onChange={(e) => mediumCategorySelect(e)}
                >
                  <option selected>카테고리 선택</option>
                  {mediumCategory.map((entry, idx) => {
                    return (
                      <option
                        key={entry.categoryId}
                        value={JSON.stringify(entry)}
                        name="mediumCategory"
                      >
                        {entry.categoryName}
                      </option>
                    );
                  })}
                </select>
              ) : null}
            </div>
            <div className="col-2">
              {smallCategory.length !== 0 ? (
                <select
                  className="custom-select"
                  id="smallCategoryForm"
                  name="smallCategory"
                  onChange={(e) => smallCategorySelect(e)}
                >
                  <option selected>카테고리 선택</option>
                  {smallCategory.map((entry, idx) => {
                    return (
                      <option
                        key={entry.categoryId}
                        value={JSON.stringify(entry)}
                        name="smallCategory"
                      >
                        {entry.categoryName}
                      </option>
                    );
                  })}
                </select>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {/* ############################### 옵션 출력 부분 ################################ */}
      {/* ############################################################################################ */}
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row" style={{ marginBottom: "30px" }}>
            <h2>옵션</h2>
          </div>
          <div className="row">
            <div className="col-3">
              <h5>옵션 입력</h5>
            </div>
            <div className="col-2">
              <h5>옵션명</h5>
            </div>
            <div className="col-2">
              <h5>옵션값</h5>
            </div>
            <div className="col-2">
              <h5>단가(원)</h5>
            </div>
            <div className="col-2">
              <h5>재고수량</h5>
            </div>
          </div>

          <div className="row">
            <div className="col-3 align-self-center"></div>
            <div className="col-2">
              <input
                type="text"
                className="form-control"
                name="optionName"
                id="optionName"
                value={optionInfo.optionName}
                onChange={(e) => {
                  //handleChangeName(e);
                  handleChange2(e);
                }}
              ></input>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control"
                name="optionValue"
                id="optionValue"
                value={optionInfo.optionValue}
                onChange={(e) => {
                  //handleChangeValue(e);
                  handleChange2(e);
                }}
              ></input>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control"
                name="price"
                id="price"
                value={optionInfo.price}
                onChange={(e) => {
                  //handleChangeValue(e);
                  handleChange2(e);
                }}
              ></input>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control"
                name="stockQuantity"
                id="stockQuantity"
                value={optionInfo.stockQuantity}
                onChange={(e) => {
                  //handleChangeValue(e);
                  handleChange2(e);
                }}
              ></input>
            </div>
          </div>

          <div className="row ">
            <div className="col-3"></div>
            <div className="col-5">
              <button
                type="button"
                className="btn btn-primary btn-block"
                id="btnAddToList"
                onClick={clickAddToList}
              >
                ▼ &nbsp; 옵션목록으로 적용
              </button>
            </div>
            <div className="col-4"></div>
          </div>

          <div className="row optionListHeader">
            <div className="col-5">
              {/* <h5>옵션 목록 (총 {productData.itemDetailFormList.length} 개)</h5> */}
              {/* <button
                type="button"
                className="btn btn-secondary"
                id="deleteOption"
              >
                삭제
              </button> */}
            </div>

            <div className="container-fluid">
              <div className="row optionListCategory">
                <div className="col-1 align-self-center">
                  <h5>번호</h5>
                </div>
                <div className="col-3 align-self-center">
                  <h5>이미지</h5>
                </div>
                <div className="col-2 my-auto mx-auto">
                  {/* <div className="row d-flex justify-content-center"> */}
                  <h5>옵션명</h5>
                  {/* </div> */}
                  {/* <div className="row d-flex justify-content-center">
            <h5 style={{ color: "dodgerblue" }}>{props.optionName}</h5>
          </div> */}
                </div>
                <div className="col-2 my-auto mx-auto">
                  <h5>옵션값</h5>
                </div>
                <div className="col-2 mx-auto">
                  <h5>단가(원)</h5>
                  {/* <button
                    type="button"
                    className="btn btn-secondary"
                    id="btnApplyAll"
                  >
                    일괄적용
                  </button> */}
                </div>

                <div className="col-2 mx-auto">
                  <h5>재고수량</h5>
                  {/* <button
                    type="button"
                    className="btn btn-secondary"
                    id="btnApplyAll"
                  >
                    일괄적용
                  </button> */}
                </div>
              </div>

              {productData &&
                productData.itemDetailFormList &&
                productData.itemDetailFormList.map((option, idx) => {
                  return (
                    <div key={idx} className="row optionList">
                      <div className="col-1 align-self-center">
                        <h5>{idx + 1}</h5>
                      </div>
                      <div className="col-3 align-self-center">
                        <div
                          style={{
                            border: "1px solid gray",
                            width: "80px",
                            height: "80px",
                          }}
                        >
                          {option.mainImg && (
                            <img
                              style={{
                                border: "0px solid gray",
                                width: "100%",
                                height: "100%",
                              }}
                              id="myImg"
                              alt=""
                              src={option.mainImgShow}
                            />
                          )}
                        </div>
                        <div>
                          <input
                            style={{ width: "100%", height: "100%" }}
                            type="file"
                            name="mainImg"
                            id="mainImg"
                            onChange={(e) =>
                              mainImageChange(e.target.files[0], idx)
                            }
                          />
                        </div>
                        {/* <div>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => mainImageUpload(idx)}
                          >
                            사진등록
                          </button>
                        </div> */}
                      </div>
                      <div
                        className="col-2 align-self-center"
                        style={{ textAlign: "center", lineHeight: "50px" }}
                      >
                        {option.optionName}
                      </div>
                      <div
                        className="col-2 align-self-center"
                        style={{ textAlign: "center", lineHeight: "50px" }}
                      >
                        {option.optionValue}
                      </div>
                      <div
                        className="col-2 align-self-center"
                        style={{ textAlign: "center", lineHeight: "50px" }}
                      >
                        {option.price}
                      </div>
                      <div
                        className="col-2 align-self-center"
                        style={{ textAlign: "center", lineHeight: "50px" }}
                      >
                        {option.stockQuantity}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {/* ############################### 상품 이미지 업로드 부분 ################################ */}
      {/* ############################################################################################ */}
      {/* <div className="container-fluid">
        <div className="jumbotron">
          <div className="row">
            <h2>이미지 업로드</h2>
          </div>
          <div className="row">
            <div className="col">
              <div style={{ float: "left" }}>대표이미지</div>
              <br />
              <br />
              <div>
                <input
                  style={{ width: "100%", height: "100%" }}
                  type="file"
                  onChange={mainImageChange}
                />
              </div>
              <br />
              <div
                style={{
                  border: "1px solid black",
                  width: "300px",
                  height: "300px",
                }}
              >
                <img
                  style={{
                    border: "1px solid black",
                    width: "100%",
                    height: "100%",
                  }}
                  alt=""
                  src={mainImgUrl}
                />
              </div>
              <br />
              {/* <div style={{ float: "left" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={imgUpload}
              >
                이미지 등록
              </button>
            </div> 
       </div>
          </div>
        </div>
      </div> */}
      {/* ############################### 상품 상세 정보 입력 부분 ################################ */}
      {/* ############################################################################################ */}
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row" style={{ marginBottom: "30px" }}>
            <h2>상품 상세 정보</h2>
          </div>
          <div className="row">
            <div className="col-8">
              <textarea
                className="form-control"
                style={{ height: "500px" }}
                placeholder="상품 상세 정보를 입력해주세요"
                name="itemComment"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      {/* ############################### 배송 정보 입력 부분 ######################################### */}
      {/* ############################################################################################ */}
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row" style={{ marginBottom: "30px" }}>
            <h2>배송 정보</h2>
          </div>
          <div className="row">
            <div className="col-4">
              <label htmlFor="logisticCompany">택배사 리스트</label>
              <select
                id="logisticCompany"
                name="logisticCompany"
                className="custom-select"
                onChange={(e) => shippingHandleChange(e)}
              >
                <option value="">택배사 선택</option>
                <option value="HYUNDAI">롯데글로벌로지스</option>
                <option value="KGB">로젠택배</option>
                <option value="EPOST">우체국택배</option>
                <option value="HANJIN">한진택배</option>
                <option value="CJGLS">CJ대한통운</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label htmlFor="shippingChargeType">배송비 종류</label>
              <select
                id="shippingChargeType"
                name="shippingChargeType"
                className="custom-select"
                onChange={(e) => shippingHandleChange(e)}
              >
                <option value="">종류 선택</option>
                <option value="FREE">무료</option>
                <option value="CONDITIONAL_FREE">조건부 무료</option>
                <option value="NOT_FREE">유료</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label htmlFor="shippingPrice">배송 비용</label>
              <input
                type="text"
                className="form-control"
                name="shippingPrice"
                id="shippingPrice"
                placeholder="배송 비용을 입력하세요"
                onChange={shippingHandleChange}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label htmlFor="releaseDate">출고 소요 기간</label>
              <input
                type="text"
                className="form-control"
                name="releaseDate"
                id="releaseDate"
                placeholder="출고 소요 기간을 일 단위로 입력하세요 예: 1, 2"
                onChange={shippingHandleChange}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-7">
              <label htmlFor="freeShipOverPrice">
                무료 배송 가능한 가격조건
              </label>
              <input
                type="text"
                className="form-control"
                name="freeShipOverPrice"
                id="freeShipOverPrice"
                placeholder="조건부 무료 선택시 기준 금액을 입력하세요. 다른 조건 선택시 빈칸으로 놔두세요"
                onChange={shippingHandleChange}
              ></input>
            </div>
          </div>
        </div>
      </div>
      {/* ############################### 상품 최종 등록 하기 버튼 부분 ################################ */}
      {/* ############################################################################################ */}
      <div className="container-fluid">
        <div className="jumbotron">
          <div className="row">
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={addProduct}
                style={{ height: "100px", fontSize: "2em" }}
                id="btnConfirm"
              >
                새로운 상품 등록하기
              </button>
            </div>
          </div>

          {/* <div className="row">

            <div className="col-12">
              <button
                type="button"
                className="btn btn-danger btn-block"
                onClick={consoleLog}
                style={{ height: "100px", fontSize: "2em" }}
                id="btnConfirm"
              >
                콘솔 출력
              </button>
            </div>

          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddNewProductApp;

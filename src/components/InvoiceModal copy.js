import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2pdf from "html2pdf.js";
import NumberToWordsIndian from './NumberToWordsIndian';
import { ToWords } from 'to-words';
const toWords = new ToWords();
const bankName=process.env.BANK_NAME
function formatIndianNumber(num) {
  // Convert number to string
  let numStr = num.toString();

  // Split the number into integer and decimal parts
  let parts = numStr.split('.');
  let integerPart = parts[0];
  let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

  // Regex to match groups of three digits
  let regex = /(\d+?)(?=(\d{2})+(\d)(?!\d))/g;

  // Replace matching groups with comma-separated groups
  integerPart = integerPart.replace(regex, "$1,");

  // Return formatted number
  return integerPart + decimalPart;
}

class InvoiceModal extends React.Component {
  constructor(props) {
    super(props);
  }

  generatePDF = () => {
    const lastInvoiceNumber = localStorage.getItem('lastInvoiceNumber');
    const element = document.getElementById("invoiceCapture");
    html2pdf(element, {
      margin: 0.1,
      filename: `${lastInvoiceNumber}_invoice`,
      image: { type: "jpeg", quality: 100 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    });
  };
  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.closeModal}
          size="lg"
          centered
        >
          <div id="invoiceCapture">
            <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
              <div className="w-100">
                <h4 className="fw-bold my-2">{this.props.info.billFrom}</h4>

                <h5 className="fw-bold my-2">
                  {this.props.info.billFromAddress}
                </h5>
                <h5 className="fw-bold my-2">
                  GST IN:
                  {this.props.info.billFromGst}
                </h5>
                <h5 className="fw-bold text-secondary mb-1">
                  Invoice #: {this.props.info.invoiceNumber || ""}
                </h5>
                <Col md={4}>
                  <div className="fw-bold mt-2">Date Of Issue:</div>
                  <div>{this.props.info.dateOfIssue || ""}</div>
                </Col>
              </div>
              <div className="text-end ms-4">
                <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
                <h5 className="fw-bold text-secondary" style={{width:"100px"}}>
                  {/* {" "} */}
                  {this.props.currency} {formatIndianNumber(this.props.total)}
                </h5>
              </div>
            </div>
            <div className="p-4">
              <Row className="mb-4">
                <Col md={4}>
                  <div className="fw-bold">Billed to:</div>
                  <div>{this.props.info.billTo || ""}</div>
                  <div>{this.props.info.billToAddress || ""}</div>
                  <div>{this.props.info.billToEmail || ""}</div>
                  <div>{this.props.info.billToPhone || ""}</div>
                  <div>{this.props.info.billToGst || ""}</div>
                </Col>
                <Col md={4}>
                  <div className="fw-bold">Billed From:</div>
                  <div>{this.props.info.billFrom || ""}</div>
                  <div>{this.props.info.billFromAddress || ""}</div>
                  <div>{this.props.info.billFromEmail || ""}</div>
                  <div>{this.props.info.billFromPhone || ""}</div>
                  <div>{this.props.info.billFromGst || ""}</div>
                </Col>
                <Col md={4}>
                  <div className="fw-bold">Bank Details:</div>
                  <div>Bank Name:UNION BANK OF INDIA</div>
                  <div>Account Number: 717901010050154</div>
                  <div> Branch IFSC : UBIN0571792</div>
                </Col>
              </Row>
              <Table className="mb-0">
                <thead>
                  <tr>
                    <th>S.No</th>
                                        
                    <th>Item</th>

                    <th>HSN</th>

                    <th>Quantity</th>

                    <th> Rate</th>
                    <th className="text-end">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.items.map((item, i) => {
                    return (
                      <tr id={i} key={i}>
                        <td style={{ width: "70px" }}>{i+1}</td>
                        <td>
                           {item.description}
                        </td>
                        <td >
                          {item.name} 
                        </td>
                        <td style={{ width: "-20px" }}>
                           {item.quantity}
                        </td>
                        <td  style={{ width: "-10px" }}>
                         {item.price}
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {this.props.currency} {item.price * item.quantity}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>








              </Table>
              
              <Table>
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                    {/* <td>&nbsp;</td> */}
                    {/* <td>&nbsp;</td> */}
                    
                  </tr>
                  <tr className="text-end">
                    <td></td>

                    <td className="fw-bold" style={{ width: "100px" }}>
                      SUBTOTAL
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {this.props.currency} {this.props.subTotal}
                    </td>
                  </tr>
                  {this.props.taxAmmount !== 0.0 && (
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{ width: "100px" }}hidden={this.props.info.taxType==="gst"}>
                        IGST({this.props.info.taxRate}%)
                       
                      </td>
                      <td className="text-end" style={{ width: "100px" }} hidden={this.props.info.taxType==="gst"}>
                        {this.props.currency} {this.props.taxAmmount}
                      </td>
                      <td className="fw-bold" style={{ width: "100px" }} hidden={this.props.info.taxType==="igst"}>
                        CGST({this.props.info.taxRate/2}                      
                        %)
                      </td>
                      <td className="text-end" style={{ width: "100px" }} hidden={this.props.info.taxType==="igst"}>
                        {this.props.currency} {this.props.taxAmmount/2}
                      </td>
                      
                    </tr>
                  )}
                  
                  {this.props.taxAmmount !== 0.0 && (
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{ width: "100px" }} hidden={this.props.info.taxType==="igst"}>
                        SGST({this.props.info.taxRate/2}                      
                        %)
                      </td>
                      <td className="text-end" style={{ width: "100px" }} hidden={this.props.info.taxType==="igst"}>
                        {this.props.currency} {this.props.taxAmmount/2}
                      </td>
                      
                    </tr>
                  )}
                  <tr className="text-end">
                  <tr>
                    
                    <td className="j" style={{ width: "90px" ,height:"30px",marginTop:"15px"}}>
                      <b>QUANTITY</b>
                    </td>
                    
                    <td  style={{ width: "50px" }}>
                      {this.props.items
                        .map((item) => parseInt(item.quantity))
                        .reduce((acc, curr) => acc + curr, 0)}
                    </td>
                  </tr>
                    <td className="fw-bold" style={{ width: "100px" }}>
                      TOTAL
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {this.props.currency} {this.props.total}
                    </td>
                    
                  </tr>


<tr className="text-end">
                  
                    <td className="" >
                    <b> TOTAL IN WORDS:</b>
                   {toWords.convert(this.props.total)}
                   
                    </td>
                    
                  </tr>
                 
                </tbody>
              </Table>
              <div style={{display:"flex",justifyContent: "flex-end",marginRight:"6%",marginTop:"0%", alignItems:"flex-end"}}>
               <b> For {this.props.info.billFrom}</b>
              </div>
              {this.props.info.notes && (
                <div className="bg-light py-3 px-4 rounded">
                  {this.props.info.notes}
                </div>
              )}
            </div>
          </div>
          <div className="pb-4 px-4">
            <Row>
              <Col md={6}>
                <Button
                  variant="primary"
                  className="d-block w-100"
                  onClick={this.generatePDF}
                >
                  <BiPaperPlane
                    style={{ width: "15px", height: "15px", marginTop: "-3px" }}
                    className="me-2"
                  />
                  Send Invoice
                </Button>
              </Col>
              <Col md={6}>
                <Button
                  variant="outline-primary"
                  className="d-block w-100 mt-3 mt-md-0"
                  onClick={this.generatePDF}
                >
                  <BiCloudDownload
                    style={{ width: "16px", height: "16px", marginTop: "-3px" }}
                    className="me-2"
                  />
                  Download Copy
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
        <hr className="mt-4 mb-3" />
      </div>
    );
  }
}

export default InvoiceModal;

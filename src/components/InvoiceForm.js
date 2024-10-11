import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';
// import DatePicker from "react-datepicker";

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currency: '₹',
      currentdate: '',
      invoiceNumber: 1,
      currentDate: '',
      dateOfIssue: '',
      billTo: '',
      billToEmail: '',
      billToAddress: '',
      billToGst: '',
      billToPhone: '',
      billToState: '',
      billToStateCode: '',
      billFrom: 'JK Silk Sarees',
      billFromEmail: 'jksilks17@gmail.com',
      billFromAddress:
        '1/322 A , Anna Street, Shakthi Nagar, Arni, T.V.Malai Dst-632301',
      billFromGst: '33EPAK0222P1Z2',
      billFromPhone: '9043974790',
      billFromState: 'Tamil Nadu',
      billFromStateCode: 33,
      pan: 'EPAPK0222P',
      notes: '',
      total: '0',
      subTotal: '0',
      taxRate: '',
      taxAmmount: '0',
      discountRate: '',
      discountAmmount: '0',
      igstRate: '',
      igstAmmount: 0,
      taxType: 'gst',
      courrierAmount: 0,
      eway: '',
      businessDetails: {
        'JK Silk Sarees': {
          email: 'jksilks17@gmail.com',
          address:
            '1/322 A, Anna Street, Shakthi Nagar, Arni, T.V.Malai Dst-632301',
          gst: '33EPAK0222P1Z2',
          phone: '9043974790',
          pan: 'EPAPK0222P',
        },
        'JK Traders': {
          email: 'jktraders17@gmail.com',
          address:
            '1/322 A, Anna Street, Shakthi Nagar, Arni, T.V.Malai Dst-632301',
          gst: '33AKCPJ2902N1ZC',
          phone: '9043974790',
          pan: 'AKCPJ2902N',
        },
      },
    };
    this.state.items = [
      {
        id: 0,
        name: '',
        description: '',
        price: '',
        quantity: '',
      },
    ];
    this.editField = this.editField.bind(this);
  }

  handleBillFromChange = (event) => {
    const selectedBusiness = event.target.value;

    // Check if the selected business exists in the mapping
    if (this.state.businessDetails[selectedBusiness]) {
      const { email, address, gst, phone, pan } =
        this.state.businessDetails[selectedBusiness];

      // Update the state with the corresponding details
      this.setState({
        billFrom: selectedBusiness,
        billFromEmail: email,
        billFromAddress: address,
        billFromGst: gst,
        billFromPhone: phone,
        pan: pan,
      });
    } else {
      // If the business is not found, just update the `billFrom` field
      this.setState({
        billFrom: selectedBusiness,
        billFromEmail: '',
        billFromAddress: '',
        billFromGst: '',
        billFromPhone: '',
        pan: '',
      });
    }
  };
  componentDidMount(prevProps) {
    this.handleCalculateTotal();
    const lastInvoiceNumber = localStorage.getItem('lastInvoiceNumber');
    if (lastInvoiceNumber) {
      this.setState({ invoiceNumber: lastInvoiceNumber });
    }
    this.setState({ currentDate: this.getCurrentDate() });
  }
  getCurrentDate() {
    // Function to get the current date in the desired format
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  }

  handleInputChange = (event) => {
    // Update invoice number in both state and local storage
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      localStorage.setItem('lastInvoiceNumber', this.state.invoiceNumber);
    });
  };
  handleRowDel(items) {
    var index = this.state.items.indexOf(items);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
    this.handleCalculateTotal();
  }
  handleAddEvent(evt) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var items = {
      id: id,
      name: '',
      price: '1',
      description: '',
      quantity: 0,
    };
    this.state.items.push(items);
    this.setState(this.state.items);
  }
  handleCalculateTotal() {
    const items = this.state.items;
    let subTotal = 0;

    items.forEach((item) => {
      subTotal += parseFloat(item.price || 0) * parseInt(item.quantity || 0);
    });
    this.setState(
      {
        subTotal: parseFloat(subTotal || 0).toFixed(2),
      },
      () => {
        this.setState(
          {
            taxAmmount: parseFloat(
              parseFloat(subTotal || 0) * (this.state.taxRate / 100),
            ).toFixed(2),
          },
          () => {
            this.setState(
              {
                discountAmmount: parseFloat(
                  parseFloat(subTotal) * (this.state.discountRate / 100),
                ).toFixed(2),
              },
              () => {
                this.setState({
                  total:
                    parseInt(this.state.courrierAmount || 0) +
                    subTotal -
                    this.state.discountAmmount +
                    parseFloat(this.state.taxAmmount),
                });
              },
            );
          },
        );
      },
    );
  }

  onItemizedItemEdit(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    var items = this.state.items.slice();
    var newItems = items.map(function (items) {
      for (var key in items) {
        if (key == item.name && items.id == item.id) {
          items[key] = item.value;
        }
      }
      return items;
    });
    this.setState({ items: newItems });
    this.handleCalculateTotal();
  }
  editField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.handleCalculateTotal();
  };
  onCurrencyChange = (selectedOption) => {
    this.setState(selectedOption);
  };
  onTaxChange = (selectedOption) => {
    this.setState(selectedOption);
  };
  openModal = (event) => {
    event.preventDefault();
    this.handleCalculateTotal();
    this.setState({ isOpen: true });
  };
  closeModal = (event) => this.setState({ isOpen: false });
  render() {
    return (
      <Form onSubmit={this.openModal}>
        <Row>
          <Col md={8} lg={9}>
            <Card className="p-4 p-xl-5 my-3 my-xl-4">
              <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                <div class="d-flex flex-column">
                  <div className="d-flex flex-column">
                    <div class="mb-2">
                      <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                      <span className="current-date">
                        <Form.Control
                          type="date"
                          value={this.state.currentdate}
                          name={'currentdate'}
                          onChange={(event) => this.editField(event)}
                          style={{
                            maxWidth: '150px',
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                    <Form.Control
                      type="date"
                      value={this.state.dateOfIssue}
                      name={'dateOfIssue'}
                      onChange={(event) => this.editField(event)}
                      style={{
                        maxWidth: '150px',
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold me-2">
                    Invoice&nbsp;Number:&nbsp;
                  </span>
                  <Form.Control
                    type="text"
                    value={this.state.invoiceNumber}
                    name={'invoiceNumber'}
                    onChange={this.handleInputChange}
                    min="1"
                    style={{
                      maxWidth: '120px',
                    }}
                  />
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold me-2">Eway&nbsp;:&nbsp;</span>
                  <Form.Control
                    type="text"
                    value={this.state.eway}
                    name={'eway'}
                    onChange={this.handleInputChange}
                    style={{
                      maxWidth: '120px',
                    }}
                  />
                </div>
              </div>
              <hr className="my-4" />
              <Row className="mb-5">
                <Col>
                  <Form.Label className="fw-bold">Bill to:</Form.Label>
                  <Form.Control
                    placeholder={'Who is this invoice to?'}
                    rows={3}
                    value={this.state.billTo}
                    type="text"
                    name="billTo"
                    className="my-2"
                    onChange={(event) => this.editField(event)}
                    autoComplete="name"
                  />
                  <Form.Control
                    placeholder={'Email address'}
                    value={this.state.billToEmail}
                    type="email"
                    name="billToEmail"
                    className="my-2"
                    onChange={(event) => this.editField(event)}
                    autoComplete="email"
                  />
                  <Form.Control
                    placeholder={'GST'}
                    value={this.state.billToGst}
                    type="text"
                    name="billToGst"
                    className="my-2"
                    onChange={(event) => this.editField(event)}
                  />
                  <Form.Control
                    placeholder={'Billing address'}
                    value={this.state.billToAddress}
                    type="text"
                    name="billToAddress"
                    className="my-2"
                    autoComplete="address"
                    onChange={(event) => this.editField(event)}
                  />
                  <Form.Control
                    placeholder={'Phone'}
                    value={this.state.billToPhone}
                    type="phone"
                    name="billToPhone"
                    className="my-2"
                    onChange={(event) => this.editField(event)}
                  />
                  <Form.Control
                    placeholder={'State Name'}
                    value={this.state.billToState}
                    type="text"
                    name="billToState"
                    className="my-2"
                    onChange={(event) => this.editField(event)}
                  />
                  <Form.Control
                    placeholder={'State Code'}
                    value={this.state.billToStateCode}
                    type="text"
                    name="billToStateCode"
                    className="my-2"
                    onChange={(event) => this.editField(event)}
                  />
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Bill from:</Form.Label>
                  <Form.Control
                    placeholder={'Who is this invoice from?'}
                    rows={3}
                    value={this.state.billFrom}
                    type="text"
                    name="billFrom"
                    className="my-2"
                    onChange={this.handleBillFromChange}
                    // onChange={(event) => this.editField(event)}
                    autoComplete="name"
                  />
                  <Form.Control
                    placeholder={'Email address'}
                    value={this.state.billFromEmail}
                    type="email"
                    name="billFromEmail"
                    className="my-2"
                    onChange={(event) => this.editField(event)}
                    autoComplete="email"
                  />
                  <Form.Control
                    placeholder={'GST'}
                    value={this.state.billFromGst}
                    type="text"
                    name="billFromGst"
                    className="my-2"
                    onChange={(event) => this.editField(event)}
                  />
                  <Form.Control
                    placeholder={'Billing address'}
                    value={this.state.billFromAddress}
                    type="text"
                    name="billFromAddress"
                    className="my-2"
                    autoComplete="address"
                    onChange={(event) => this.editField(event)}
                  />
                  <Form.Control
                    placeholder={'Phone'}
                    value={this.state.billFromPhone}
                    type="phone"
                    name="billFromPhone"
                    className="my-2"
                    onChange={(event) => this.editField(event)}
                  />
                  <Form.Control
                    placeholder={'State Name'}
                    value={this.state.billFromState}
                    type="text"
                    name="billFromState"
                    className="my-2"
                    onChange={(event) => this.editField(event)}
                  />
                  <Form.Control
                    placeholder={'State Code'}
                    value={this.state.billFromStateCode}
                    type="number"
                    name="billFromStateCode"
                    className="my-2"
                    onChange={(event) => this.editField(event)}
                  />
                  <Form.Control
                    placeholder={'PAN'}
                    value={this.state.pan}
                    type="text"
                    name="pan"
                    className="my-2"
                    onChange={(event) => this.editField(event)}
                  />
                </Col>
              </Row>
              <InvoiceItem
                onItemizedItemEdit={this.onItemizedItemEdit.bind(this)}
                onRowAdd={this.handleAddEvent.bind(this)}
                onRowDel={this.handleRowDel.bind(this)}
                currency={this.state.currency}
                items={this.state.items}
              />
              <Row className="mt-4 justify-content-end">
                <Col lg={6}>
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">Subtotal:</span>
                    <span>
                      {this.state.currency}
                      {this.state.subTotal}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Discount:</span>
                    <span>
                      <span className="small ">
                        ({this.state.discountRate || 0}%)
                      </span>
                      {this.state.currency}
                      {this.state.discountAmmount || 0}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Tax:</span>
                    <span>
                      <span className="small ">
                        ({this.state.taxRate || 0}%)
                      </span>
                      {this.state.taxAmmount / 2 +
                        '+' +
                        this.state.taxAmmount / 2 +
                        '=' +
                        this.state.taxAmmount || 0}
                    </span>
                  </div>
                  <hr />
                  <div
                    className="d-flex flex-row align-items-start justify-content-between"
                    style={{
                      fontSize: '1.125rem',
                    }}
                  >
                    <span className="fw-bold">Total:</span>
                    <span className="fw-bold">
                      {this.state.currency}
                      {this.state.total || 0}
                    </span>
                  </div>
                </Col>
              </Row>
              <hr className="my-4" />
              <Form.Label className="fw-bold">Notes:</Form.Label>
              <Form.Control
                placeholder="Thanks for your business!"
                name="notes"
                value={this.state.notes}
                onChange={(event) => this.editField(event)}
                as="textarea"
                className="my-2"
                rows={1}
              />
            </Card>
          </Col>
          <Col md={4} lg={3}>
            <div className="sticky-top pt-md-3 pt-xl-4">
              <Button variant="primary" type="submit" className="d-block w-100">
                Review Invoice
              </Button>
              <InvoiceModal
                showModal={this.state.isOpen}
                closeModal={this.closeModal}
                info={this.state}
                items={this.state.items}
                currency={this.state.currency}
                subTotal={this.state.subTotal}
                taxAmmount={this.state.taxAmmount}
                discountAmmount={this.state.discountAmmount}
                total={this.state.total}
              />
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Courrier Charges:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="courrierAmount"
                    type="number"
                    value={this.state.courrierAmount}
                    onChange={(event) => this.editField(event)}
                    className="bg-white border"
                    placeholder="0.0"
                    min="0.00"
                    max="1000000.00"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Tax Type</Form.Label>
                <Form.Select
                  onChange={(event) =>
                    this.onTaxChange({ taxType: event.target.value })
                  }
                  className="btn btn-light my-1"
                  aria-label="Change"
                >
                  <option value="gst">GST</option>
                  <option value="igst">IGST</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Tax rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="taxRate"
                    type="number"
                    value={this.state.taxRate}
                    onChange={(event) => this.editField(event)}
                    className="bg-white border"
                    placeholder="0.0"
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">SGSTrate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    hidden={this.state.taxType === 'igst'}
                    name="taxRate"
                    type="number"
                    value={this.state.taxRate / 2}
                    onChange={(event) => this.editField(event)}
                    className="bg-white border"
                    placeholder="0.0"
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">CGSTrate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    hidden={this.state.taxType === 'igst'}
                    name="taxRate"
                    type="number"
                    value={this.state.taxRate / 2}
                    onChange={(event) => this.editField(event)}
                    className="bg-white border"
                    placeholder="0.0"
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Discount rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="discountRate"
                    type="number"
                    value={this.state.discountRate}
                    onChange={(event) => this.editField(event)}
                    className="bg-white border"
                    placeholder="0.0"
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default InvoiceForm;

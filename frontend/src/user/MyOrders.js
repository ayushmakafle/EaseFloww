import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import axios from "axios";
import { Table, Spin, Button, Modal, Descriptions } from "antd";
import MainFooter from "../components/footer";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false); // Modal visibility state
  const [selectedOrder, setSelectedOrder] = useState(null); // Selected order for modal

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("/api/v1/order/orders");

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error.message);
      setError("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Total Price in NPR",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Paid At",
      dataIndex: "paidAt",
      key: "paidAt",
      render: (paidAt) => (
        <p className="mb-0">
          {paidAt ? new Date(paidAt).toLocaleString() : "Not Paid"}
        </p>
      ),
    },
    {
      title: "Shipping",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered, record) => {
        const deliveredAtDate = new Date(record.deliveredAt);

        return (
          <>
            {isDelivered
              ? isNaN(deliveredAtDate) ||
                deliveredAtDate.toString() === "Invalid Date"
                ? "Completed"
                : `Completed at ${deliveredAtDate.toLocaleString()}`
              : "Dispatched"}
          </>
        );
      },
    },
    {
      title: "Your Order Details!",
      dataIndex: "_id",
      key: "actions",
      render: (orderId) => (
        <Button onClick={() => handleViewMore(orderId)} style={{backgroundColor:'#B80F4A',color:'white'}}>
        <Button type="primary" onClick={() => handleViewMore(orderId)} style={{ backgroundColor: "#ef5e99", marginBottom: "10px" }}>
          View more
        </Button>
      ),
    },
  ];
  const handleViewMore = (orderId) => {
    // Find the selected order
    const selectedOrder = orders.find((order) => order._id === orderId);
    setSelectedOrder(selectedOrder);
    setVisible(true);
  };

  const handleModalCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2
              style={{ color: "#ef5e99", margin: "20px", fontWeight: "bold" }}
            >
              My Orders
            </h2>
            {loading && <Spin />}
            {error && <p>Error: {error}</p>}
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <>
                <Table
                  dataSource={orders}
                  columns={columns}
                  style={{ margin: "20px" }}
                />
                <Modal
                  visible={visible}
                  onCancel={handleModalCancel}
                  footer={null}
                >
                  {selectedOrder && (
                    <div>
                      <h3 style={{ color: "#ef5e99", marginBottom: "10px" , fontWeight:'bold'}}>
                        Product List
                      </h3>
                      <table style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.orderItems.map((item) => (
                            <tr key={item.Product._id}>
                              <td>{item.name}</td>
                              <td>{item.qyt}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Modal>
              </>
            )}
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default MyOrders;

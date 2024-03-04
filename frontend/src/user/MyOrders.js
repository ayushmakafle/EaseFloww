import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import axios from "axios";
import { Table, Spin, Button, Modal } from "antd";
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
    // {
    //   title: 'Paid At',
    //   dataIndex: 'paidAt',
    //   key: 'paidAt',
    // },

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
        <Button type="primary" onClick={() => handleViewMore(orderId)}>
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
                  title={`Order Details - ${
                    selectedOrder && selectedOrder._id
                  }`}
                  visible={visible}
                  onCancel={handleModalCancel}
                  footer={null}
                >
                  {selectedOrder && (
                    <div>
                      <h3>Product List:</h3>
                      <ul>
                        {selectedOrder.orderItems.map((item) => (
                          <li key={item.Product._id}>
                            <strong>{item.name}</strong> - Quantity: {item.qyt}
                          </li>
                        ))}
                      </ul>
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

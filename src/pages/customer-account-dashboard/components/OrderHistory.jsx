import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OrderHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-08-02",
      status: "delivered",
      total: 299.99,
      items: [
        {
          id: 1,
          name: "Artisan Ceramic Mug Set",
          image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop",
          quantity: 2,
          price: 149.99
        }
      ],
      tracking: "TRK123456789",
      carrier: "FedEx"
    },
    {
      id: "ORD-2024-002",
      date: "2024-07-28",
      status: "shipped",
      total: 189.50,
      items: [
        {
          id: 2,
          name: "Handwoven Wool Scarf",
          image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=300&fit=crop",
          quantity: 1,
          price: 189.50
        }
      ],
      tracking: "TRK987654321",
      carrier: "UPS"
    },
    {
      id: "ORD-2024-003",
      date: "2024-07-15",
      status: "processing",
      total: 459.99,
      items: [
        {
          id: 3,
          name: "Leather Messenger Bag",
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
          quantity: 1,
          price: 459.99
        }
      ],
      tracking: null,
      carrier: null
    }
  ];

  const statusConfig = {
    processing: { color: 'bg-yellow-100 text-yellow-800', icon: 'Clock' },
    shipped: { color: 'bg-blue-100 text-blue-800', icon: 'Truck' },
    delivered: { color: 'bg-green-100 text-green-800', icon: 'CheckCircle' },
    cancelled: { color: 'bg-red-100 text-red-800', icon: 'XCircle' }
  };

  const filters = [
    { id: 'all', label: 'All Orders' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'processing', label: 'Processing' }
  ];

  const filteredOrders = selectedFilter === 'all' 
    ? orders 
    : orders?.filter(order => order?.status === selectedFilter);

  const handleReorder = (orderId) => {
    console.log(`Reordering ${orderId}`);
    // Add reorder logic here
  };

  const handleTrackOrder = (tracking, carrier) => {
    console.log(`Tracking ${tracking} with ${carrier}`);
    // Add tracking logic here
  };

  return (
    <div id="order-history" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-crimson font-semibold text-foreground">
          Order History
        </h2>
        <div className="flex flex-wrap gap-2">
          {filters?.map((filter) => (
            <Button
              key={filter?.id}
              variant={selectedFilter === filter?.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter?.id)}
            >
              {filter?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {filteredOrders?.map((order) => (
          <div key={order?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div>
                  <h3 className="font-semibold text-foreground">{order?.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    Ordered on {new Date(order.date)?.toLocaleDateString()}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusConfig?.[order?.status]?.color}`}>
                  <Icon name={statusConfig?.[order?.status]?.icon} size={12} />
                  <span className="capitalize">{order?.status}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">${order?.total}</p>
                <p className="text-sm text-muted-foreground">
                  {order?.items?.length} item{order?.items?.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {order?.items?.map((item) => (
                <div key={item?.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{item?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item?.quantity} × ${item?.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-border">
              <div className="flex items-center space-x-4">
                {order?.tracking && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Truck"
                    iconPosition="left"
                    onClick={() => handleTrackOrder(order?.tracking, order?.carrier)}
                  >
                    Track Package
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={() => handleReorder(order?.id)}
                >
                  Reorder
                </Button>
              </div>
              {order?.tracking && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Tracking:</span> {order?.tracking} ({order?.carrier})
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {filteredOrders?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No orders found</h3>
          <p className="text-muted-foreground mb-4">
            {selectedFilter === 'all' ? "You haven't placed any orders yet." 
              : `No ${selectedFilter} orders found.`}
          </p>
          <Button variant="default" iconName="ShoppingBag" iconPosition="left">
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
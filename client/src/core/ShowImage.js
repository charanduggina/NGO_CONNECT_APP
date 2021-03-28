import React from "react";
import { API } from "../config";

export const ShowImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
    </div>
);

export const ShowScheduleImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/schedule_photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
    </div>
);


export const ShowCertificateImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/certficate_photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
    </div>
);


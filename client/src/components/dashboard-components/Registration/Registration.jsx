import React from "react";
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Col,
    Row
} from 'reactstrap';
import { Line } from 'react-chartjs-2';

//Line chart
let lineData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12],
    datasets: [{
        label: 'Users',
        borderWidth: 1,
        backgroundColor: 'rgba(94,114,228,.1)',
        borderColor: 'rgb(94,114,228)',
        pointBorderColor: 'rgb(94,114,228)',
        pointBackgroundColor: 'rgb(94,114,228)',
        data: [13, 24, 17, 26, 31, 38, 34, 28,19,21,26,30]
    }, {
        label: 'NGOs',
        borderWidth: 1,
        backgroundColor: 'rgba(79,195,247,.1)',
        borderColor: 'rgb(79,195,247)',
        pointBorderColor: 'rgb(79,195,247)',
        pointBackgroundColor: 'rgb(79,195,247)',
        data: [2,6,3,4, 7, 9, 5, 3,6,2,5,8]
    }]
};

const Registration = () => {
    return (
        <Card>
            <CardBody>
                <div className="d-flex align-items-center">
                    <div>
                        <CardTitle>New Registrations</CardTitle>
                        <CardSubtitle>Summary of the Year</CardSubtitle>
                    </div>
                </div>
                <Row>
                    <Col lg="12">
                        <div className="campaign ct-charts">
                            <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 250 }}>
                                <Line data={lineData} options={{ maintainAspectRatio: false, legend: { display: false, labels: { fontFamily: "Nunito Sans" } }, scales: { yAxes: [{ stacked: true, gridLines: { display: false }, ticks: { fontFamily: "Nunito Sans" } }], xAxes: [{ gridLines: { display: false }, ticks: { fontFamily: "Nunito Sans" } }] } }} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default Registration;
import React from "react";

import img1 from '../../../assets/images/users/1.jpg';
import img2 from '../../../assets/images/users/2.jpg';
import img3 from '../../../assets/images/users/3.jpg';
import img4 from '../../../assets/images/users/4.jpg';

import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Input,
    Table
} from 'reactstrap';

const Projects = () => {
    return (
        /*--------------------------------------------------------------------------------*/
        /* Used In Dashboard-4 [General]                                                  */
        /*--------------------------------------------------------------------------------*/

        <Card>
            <CardBody>
                <div className="d-flex align-items-center">
                    <div>
                        <CardTitle>Statistics of the Month</CardTitle>
                        <CardSubtitle>Overview of Latest Month</CardSubtitle>
                    </div>
                    <div className="ml-auto d-flex no-block align-items-center">
                        <div className="dl">
                            <Input type="select" className="custom-select">
                                <option value="0">Monthly</option>
                                <option value="1">Daily</option>
                                <option value="2">Weekly</option>
                                <option value="3">Yearly</option>
                            </Input>
                        </div>
                    </div>
                </div>
                <Table className="no-wrap v-middle" responsive>
                    <thead>
                        <tr className="border-0">
                            <th className="border-0">NGO</th>
                            <th className="border-0">Donations Received</th>
                            <th className="border-0">New Ratings</th>
                            <th className="border-0">People Volunteered</th>
                            <th className="border-0">Category</th>
                      
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <div className="">
                                        <h5 className="mb-0 font-16 font-medium">Help for Blind</h5><span>9378428941</span></div>
                                </div>
                            </td>
                            <td>1</td>

                            
                            <td>2</td>
                            <td className="blue-grey-text  text-darken-4 font-medium">3</td>
                            <td className="blue-grey-text  text-darken-4 font-medium">Blind</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                   
                                    <div className="">
                                        <h5 className="mb-0 font-16 font-medium">Edu Poor</h5><span>9988345666</span></div>
                                </div>
                            </td>
                            <td>2</td>

                          
                            <td>4</td>
                            <td className="blue-grey-text  text-darken-4 font-medium">6</td>
                            <td className="blue-grey-text  text-darken-4 font-medium">Education</td>
                            
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                  
                                    <div className="">
                                        <h5 className="mb-0 font-16 font-medium">Smile Foundation</h5><span>8989776632</span></div>
                                </div>
                            </td>
                            <td>2</td>

                           
                            <td>1</td>
                            <td className="blue-grey-text  text-darken-4 font-medium">4</td>
                            <td className="blue-grey-text  text-darken-4 font-medium">GirlWelfare</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                  
                                    <div className="">
                                        <h5 className="mb-0 font-16 font-medium">Vriddhashram</h5><span>9966435622</span></div>
                                </div>
                            </td>
                            <td>4</td>

                           
                            <td>6</td>
                            <td className="blue-grey-text  text-darken-4 font-medium">10</td>
                            <td className="blue-grey-text  text-darken-4 font-medium">OldPeople</td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card >
    );
}

export default Projects;

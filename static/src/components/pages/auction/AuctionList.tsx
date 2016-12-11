import {BasePage} from "../BasePage";
import * as React from 'react';
import Auction from "../../partials/auction/Auction";

export default class AuctionList extends BasePage {

    auctions = [
        {
            title: "ziemniaczki",
            amount: "1000",
            creationDate: "20-10-2016",
            dueDate: "27-10-2016",
            item: {
                name: "ziemniak",
                typeName: "lord",
                country: "Polska"
            }
        },
        {
            title: "jabłuszka",
            amount: "25000",
            creationDate: "9-6-2016",
            dueDate: "15-7-2016",
            item: {
                name: "jabłko",
                typeName: "ligol",
                country: "Polska"
            }
        },
        {
            title: "gruszeczlo",
            amount: "12352",
            creationDate: "1-4-2017",
            dueDate: "15-4-2017",
            item: {
                name: "gruszka",
                typeName: "jakas",
                country: "Niemcy"
            }
        },
        {
            title: "pietruszeczka",
            amount: "12574",
            creationDate: "19-10-2016",
            dueDate: "21-11-2016",
            item: {
                name: "pietruszka",
                typeName: "a jaki moze byc",
                country: "Holandia"
            }
        },
        {
            title: "ziemniaczki2",
            amount: "1000",
            creationDate: "20-10-2016",
            dueDate: "27-10-2016",
            item: {
                name: "ziemniak",
                typeName: "lord",
                country: "Polska"
            }
        },
        {
            title: "jabłuszka2",
            amount: "25000",
            creationDate: "9-6-2016",
            dueDate: "15-7-2016",
            item: {
                name: "jabłko",
                typeName: "ligol",
                country: "Polska"
            }
        },
        {
            title: "gruszeczlo2",
            amount: "12352",
            creationDate: "1-4-2017",
            dueDate: "15-4-2017",
            item: {
                name: "gruszka",
                typeName: "jakas",
                country: "Niemcy"
            }
        },
        {
            title: "pietruszeczka2",
            amount: "12574",
            creationDate: "19-10-2016",
            dueDate: "21-11-2016",
            item: {
                name: "pietruszka",
                typeName: "a jaki moze byc",
                country: "Holandia"
            }
        }
    ];


    render() {

        return (
            <div className="AuctionList">
                {this.auctions.map((auction) => {
                    return (
                        <Auction auction={auction} key={auction.title}/>
                    );
                })}
            </div>
        );
    }
}
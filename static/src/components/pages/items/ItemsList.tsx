import * as React from 'react';
import {BaseProps, BaseStates, BasePage} from "../BasePage";
import JsonUtils from "../../../utils/JsonUtils";
import UserUtils from "../../../utils/UserUtils";
import ModalWindow from "../../partials/system/modalWindow/ModalWindow";

interface ItemsListState extends BaseStates {
    modalVisible: boolean;
}

export default class ItemsList extends BasePage<BaseProps, ItemsListState> {

    usedItems: any = [];
    unusedItems: any = [];

    allowedUsers = [
        UserUtils.userTypes.admin
    ];

    componentWillMount(): void {
        this.state = ({
            mode: this.modes.loading,
            modalVisible: false
        } as ItemsListState);
        this.loadItems();
    }

    showModalWindow() {
        this.setState({modalVisible: true} as ItemsListState);
    }

    hideModalWindow() {
        this.setState({modalVisible: false} as ItemsListState);
    }

    loadItems() {
        JsonUtils.handleGET('/getUsedItems')
            .then((response: any) => {
                this.usedItems = response.data;
            })
            .then(() => {
                return JsonUtils.handleGET('/getUnusedItems');
            })
            .then((responseUnused: any) => {
                this.unusedItems = responseUnused.data;
                this.updateMode(this.modes.ready);
            });
    }

    protected _deleteItem(): void {
        this.showModalWindow();
    }

    renderHTML() {
        console.log("used", this.usedItems)
        console.log("unused", this.unusedItems)

        return (
            <div className="ItemsList">
                <div className="items-header">
                    <span>Przedmioty</span>
                    <span>Odmiana</span>
                    <span>Kraj</span>
                    <span>Usuń</span>
                </div>
                {this.unusedItems.map((item: any) => {
                    return (
                        <div className="item-row">
                            <span>{item.name}</span>
                            <span>{item.typeName}</span>
                            <span>{item.country}</span>
                            <span className="icon-cancel-circled" onClick={() => {this._deleteItem()}}/>
                        </div>
                    );
                })}
                {this.usedItems.map((item: any) => {
                    return (
                        <div className="item-row">
                            <span>{item.name}</span>
                            <span>{item.typeName}</span>
                            <span>{item.country}</span>
                            <span className="icon-share">
                                <span className="tooltiptext">Ten artykuł nie może zostać usunięty, ponieważ jest użyty w przynajmniej jednej aukcji.</span>
                            </span>
                        </div>
                    );
                })}
                {this.state.modalVisible &&
                <ModalWindow hide={this.hideModalWindow.bind(this)}>
                    <span>Nie można usunąć przedmiotu. Przedmiot jest w użyciu</span>
                    <button className="buttonSubmit" onClick={() =>this.hideModalWindow()}>Ok</button>
                </ModalWindow>}
            </div>
        );
    }
}
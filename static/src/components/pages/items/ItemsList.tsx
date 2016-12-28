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
        this.loadItems();
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

    protected _deleteItemRequest(itemId: number): void {
        let formData: FormData = new FormData();

        formData.append('itemId', itemId);

        JsonUtils.handlePOST('/removeItem', formData)
            .then((response: any) => {
                this.setState({mode: response.data ? this.modes.success : this.modes.fail} as ItemsListState);
            });
    }

    protected _deleteItem(itemId: number): void {
        this._deleteItemRequest(itemId).then(() => {
            this.showModalWindow()
        });
    }

    renderHTML() {

        return (
            <div className="ItemsList">
                <div className="items-header">
                    <span className="item">Przedmioty</span>
                    <span className="item">Odmiana</span>
                    <span className="item">Kraj</span>
                    <span className="item">Usuń</span>
                </div>
                {this.unusedItems.map((item: any) => {
                    return (
                        <div className="item-row" key={item.id}>
                            <span className="item">{item.name}</span>
                            <span className="item">{item.typeName}</span>
                            <span className="item">{item.country}</span>
                            <span className="item icon-cancel-circled" onClick={() => {this._deleteItem(item.id)}}/>
                        </div>
                    );
                })}
                {this.usedItems.map((item: any) => {
                    return (
                        <div className="item-row" key={item.id}>
                            <span className="item">{item.name}</span>
                            <span className="item">{item.typeName}</span>
                            <span className="item">{item.country}</span>
                            <span className="item icon-share">
                                <span className="tooltiptext">Ten artykuł nie może zostać usunięty, ponieważ jest użyty w przynajmniej jednej aukcji.</span>
                            </span>
                        </div>
                    );
                })}
                {this.state.modalVisible &&
                <ModalWindow hide={this.hideModalWindow.bind(this)}>
                    {this.state.mode === this.modes.success && <span>Usunąłeś przedmiot.</span>}
                    {this.state.mode === this.modes.fail && <span>Błąd serwera, spróbuj ponownie.</span>}
                    <button className="buttonSubmit" onClick={() =>this.hideModalWindow()}>Ok</button>
                </ModalWindow>}
            </div>
        );
    }
}
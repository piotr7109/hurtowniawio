import * as React from 'react';

export default class MainPage extends React.Component {

    render() {
        return (
            <div className="MainPage row">
                <h1 className="col-12">Hurtownia warzyw i owoców</h1>
                <div className="row">
                    <div className="content-left col-lg-6 col-xs-12">
                        <img alt="hurtownia" src="../../../../public/uploads/images/hurtownia.jpg"/>
                    </div>
                    <div className="content-right col-lg-6 col-xs-12">
                        <h2>Witamy w naszej hurtowni</h2>
                        <p>Strona ta jest stworzona dla rolników którzy sprzedają najwyższej jakości produkty i chcą z nami
                    współpracować. Nasza hurtownia zajmuje się przechowywaniem warzyw i owoców. Posiadamy jedne
                    z bardziej nowoczesnych magazynów w Europie, dzieki czemu możemy przechowywać warzywa i owoce
                    przed długi czas bez utraty ich wartości.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="content-right col-lg-6 col-xs-12">
                        <h2>Transport</h2>
                        <p>Naszym klientom zapewniamy również transport nowoczesnymi pojazdami dostosowanymi do przewozu warzyw
                    i owoców. Dzięki nim jesteśmy w stanie zagwarantować nawyższą jakość usług, gdyż w transporcie
                    najczęściej dochodzi do uszkodzenia towaru. Z naszym wyposażeniem i doświadczeniem, nie ma możliwości
                    aby towar uległ zniczeniu, zawsze szybko i bezpiecznie trafia do klienta.</p>
                    </div>
                    <div className="content-left col-lg-6 col-xs-12">
                        <img alt="hurtownia" src="../../../../public/uploads/images/truck.jpg"/>
                    </div>
                </div>
                <div className="row">
                    <div className="content-left col-lg-6 col-xs-12">
                        <img alt="hurtownia" src="../../../../public/uploads/images/hurtownia.jpg"/>
                    </div>
                    <div className="content-right col-lg-6 col-xs-12">
                        <h2>BEEF Industry</h2>
                        <p>Jesteśmy firmą działającą na rynku od 2014 roku. Założona podczas pewnego projektu akademickiego
                    funcjonuje do dziś. W jej skład wchodzą:</p>
                        Michał Bardzki
                        Piotr Fic
                    </div>
                </div>
            </div>
        );
    }
}
Projekt "touch&GO!" jest to gra polegająca na przeprowadzeniu kulki przez 15 labiryntów. Przejście pierwszego odblokowuje następny. Przejście każdego z nich wymaga unikania kontaktu ze ścianami labiryntu. Z każdym kolejnym labiryntem zwiększa se średnica kulki. Dotknięcie ścianki jest traktowane jako błąd i powoduje rozpoczecie danego labiryntu od nowa.

Po przejściu wszystkich torów pojawia się podsumowanie zawierające łączy czas przejścia oraz liczbę popełnionych błędów.

Użyte technologie: HTML, CSS, JavaScript i Grunt.

Użycie Grunt pozwoliło zminimalizować pliki .css i .js.

Każdy labirynt zbudowany jest na siatce grid, która ma wymiary 12 kolumn i 7 wierszy.Każdy labirynt jest opisany za pomocą obiektu. W każdym z nich jest właściwość layout. Jest to tablica obiektów, które zawierają współrzędne bloków tworzących labirynt.

Projekt dopasowuje się do różnych rozdzielczości.
Michele Tatti s265607

Per l'avvio è sufficiente fare:
npm install
npm start 
ed aprire il browser su http://localhost:4200
e lanciare il server con il comando:
npx json-server-auth virtuallabs.json -r virtuallabs_routes.json

Per fare il log in premere il bottone "login" in alto a destra, apparirà una schermata dove poter inserire le credeziali.
Inserire le credenziali contenute nel testo del laboratorio e premere il bottone "login" sotto il form.
Se l'operazione non andrà a buon fine, perché sono state inserite credenziali sbagliate, il form verrà resettato e 
apparirà un avviso.
Se si preme il tasto cancel, o si clicca fuori dal form, la finestra per il login verrà chiusa.
Una volta loggato sarà possibile selezionare la tab students o la tab vm. 
Per fare il log out premere il bottone in alto a destra che comparirà una volta fatto il login.
Se l'utente non è loggato e preme la label studenti o vms oppure la label applicazioni internet nella sidenav, 
si aprirà automaticamente la schermata di log in, se l'autenticazione andrà a buon fine verrà visualizzato il contenuto corrispondente.
Tutte le altre funzioni sono uguali al laboratorio precedente:
Per far apparire e scomparire la barra di navigazione premere il menu button in alto a sinista
Per aggiungere uno studente alla tabella, posizionarsi su add student, apparirà una lista che sarà possibile filtrare, selezionare lo studente desiderato e premere il pulsante add.
Per eliminare uno studente dalla tabella selezionare il checkbox corrispondente e premere Delete selected
Per ordinare la tabella per id/Name/FirstName selezionare il tag corrispettivo e cliccarci sopra


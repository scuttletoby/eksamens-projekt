

VIGTIGT: 
HUSK at notere i rapporten, hvis du ændrer i backend/API - hvad du ændrer og hvorfor. 
- Og HUSK så også at aflevere din version af backenden.

----------------------------------------------------------------------------------------------------------------
------ START BACKEND: ------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------

Produktion (hvis du ikke retter i backend/API): 
    npm run start

Developer (foretrukken hvis du skal rettes i backend - trækker på nodemon): 
    npm run devStart

Projektet kører på PORT 5888 - dvs. http://localhost:5888

Projektet benytter MongoDB - tjek .env-filen for at tilrette evt. path/sti til din MongoDB


----------------------------------------------------------------------------------------------------------------
------ API - INSOMNIA/POSTMAN ----------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------

BRUG INSOMNIA EL. POSTMAN: til at teste API'et - både GET, POST, PUT, PATCH og DELETE
    - brug især Insomnia/Postman når du når til POST, PUT, DELETE - da det er her, du aflæser hvordan API'et forventer at modtage data

Filer til import i din egen Insomnia/Postman kan hentes i mappen: _INSTALLATION/Insomnia eller Postman til import

----------------------------------------------------------------------------------------------------------------
------ BILLEDER ------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------

Bemærk, at du kan få en oversigt over endpoints og image-paths her (forudsat at serveren er startet):
    
    http://localhost:5888

REQUEST: Billederne hentes fra frontend fx med følgende adresse (hvis du ikke har ændret på PORT'en):

		"community":    "http://localhost:5888/images/community/",
		"events":       "http://localhost:5888/images/event/",
		"heros":        "http://localhost:5888/images/hero/",
		"interest":     "http://localhost:5888/images/interest/",
		"sponsors":     "http://localhost:5888/images/sponsor/",
		"testimonials": "http://localhost:5888/images/testimonial/"

UPLOAD: Upload af image-filer (post og put) sendes til en af mapperne (afhænger af route): 

    /public/images/community
    /public/images/event
    /public/images/hero
    /public/images/interest
    /public/images/sponsor
    /public/images/testimonial

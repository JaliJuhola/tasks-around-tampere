from rest.alias.models import AliasWords
# Creating words
words = ['Piano','Vasara','Rumpali','Tulenarka','Ympyrä','Ahvenanmaa','Aula','Potilas','Polku','Kylmä','Poro','Selitys','Hiirenloukku','Kalakauppias','Takkahuone','Neliapila','Alushousut','Koululainen','Kaljamaha','Rantaloma','Harha','Tiesulku','Erakko','Kobra','Hurjastella','Avanto','Rumba','Mekaanikko','Kulmakarva','Innokas','Golfmaila','Kunniavieras','Saha','Rankka','Sutata','Jazz','Kaksipäinen','Toukka','Nuuska','Kiihottaa','Kalkkuna','Savikiekko','Teepussi','Turvavyö','Torjua','Kunta','Anoppi','Kateellinen','Väittely','Keskeyttää','Karvalakki','Aitaus','Tyhjiö','Taaksejäänyt','Dokumentti','Pesue','Väärinpäin','Salkku','Törkeä','Huvipuisto','Sinfonia','Myyrä','Luukato','Morsian','Tuore','Vokaali','Paletti','Ahmatti','Kerä','Pelikaani']

for word in words:
    AliasWords.objects.create(word=word)


# Creating quiklash questions

from rest.quiklash.models import QuiklashQuestion

questions = ['Joku random kysymys','mitä kissa sanoo','mitä koira sanoo','mitä jorma sanoo']

for question in questions:
    QuiklashQuestion.objects.create(question=question)

from rest.geocache.models import GeocacheMainGame, GeocacheRiddles
GeocacheRiddles.objects.create(id=1, riddle="Tietopinnin 24/7 luokan ensimmainen huone vasemmalta", answer="tassa_on_eka_qr_koodi")
GeocacheRiddles.objects.create(id=2, riddle="Pinni A:n ruokalan linjaston alla!", answer="et_voi_arvata_naita_mitenkaan")
GeocacheRiddles.objects.create(id=3, riddle="Yliopiston edessa oleva bussipysakki josta lahtee bussi 6", answer="vai_voitko_sittenkin")
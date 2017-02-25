import resume from '../../config/resume.json'

var page = $('.page'),
	page1 = $('.page1'),
	page2 = $('.page2'),
	page3 = $('.page3'),
	page4 = $('.page4'),
	page5 = $('.page5'),
	page6 = $('.page6');

page.prepend('<h1></h1>');
page1.append("<div class='pageContent'></div>");
page2.append("<div class='pageContent'></div>");
page3.append("<div class='pageContent'></div>");
page4.append("<div class='pageContent'></div>");
page5.append("<div class='pageContent'></div>");
page6.append("<div class='pageContent'></div>");

var pageH1 = $('.page h1'),
	page1Content = page1.find('.pageContent'),
	page2Content = page2.find('.pageContent'),
	page3Content = page3.find('.pageContent'),
	page4Content = page4.find('.pageContent'),
	page5Content = page5.find('.pageContent'),
	page6Content = page6.find('.pageContent');

	resume.forEach((value,index)=>{
		pageH1.eq(index).html(value.title)
		switch(index){
			case 0:
				value.content.forEach((value,index)=>{
					page1Content.append('<h2></h2>');
					page1Content.children().last().html(value)

				})
				break;
			case 1:
				value.content.forEach((value,index)=>{
					page2Content.append('<h2></h2>');
					page2Content.children().last().html(value)

				})
				break;
			case 2:
				value.content.forEach((value,index)=>{
					let time = value.time; 
					let company = value.company; 
					let description = value.description;
					let page3c = `<div class='hasTimePeriod page3key${index}'>
										<h2></h2>
										<div class='page3Detail'>
											<h2></h2>
											<p></p>
										</div>
								</div>`

					page3Content.append(page3c);
					let page3key = $('.page3key' + index);
					let page3Detail = page3key.find('.page3Detail');
					page3key.children().first().html(time);
					page3Detail.children().first().html(company);
					page3Detail.children().last().html(description);
				})
				break;
			case 3:
				value.content.forEach((value,index)=>{
					let time = value.time;  
					let project = value.project;
					let description = value.description;
					let page4c = `<div class='hasTimePeriod page4key${index}'>
										<h2></h2>
										<div class='page4Detail'>
											<h2></h2>
											<p></p>
										</div>
								</div>`
					page4Content.append(page4c);
					let page4key = $('.page4key' + index);
					let page4Detail = page4key.find('.page4Detail');
					page4key.children().first().html(time);
					page4Detail.children().first().html(project);
					page4Detail.children().last().html(description);
				})
				break;
			case 4:
				value.content.forEach((value,index)=>{
					let time = value.time;
					let school = value.school;
					let major = value.major; 
					let description = value.description;
					let page5c = `<div class='hasTimePeriod page5key${index}'>
										<h2></h2>
										<div class='page5Detail'>
											<h2></h2>
											<h2></h2>
											<p></p>
										</div>
									</div>`
					page5Content.append(page5c);
					let page5key = $('.page5key' + index);
					let page5Detail = page5key.find('.page5Detail');
					page5key.children().first().html(time);
					page5Detail.children().eq(0).html(school);
					page5Detail.children().eq(1).html(major);
					page5Detail.children().last().html(description);
				})
				break;
			case 5:
				value.content.forEach((value,index)=>{
					page6Content.append('<h2></h2>');
					page6Content.children().last().html(value)

				})
				break;
			default:
		}
	});



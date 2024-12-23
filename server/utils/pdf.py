from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import Color
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from datetime import datetime
import io
import base64

# Register custom font (Poppins)
pdfmetrics.registerFont(TTFont('Poppins', 'utils/fonts/Poppins-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Poppins-Bold', 'utils/fonts/Poppins-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Poppins-ExtraBold', 'utils/fonts/Poppins-ExtraBold.ttf'))

class PDF:
    def __init__(self):
        self.buffer = io.BytesIO()
        self.styles = getSampleStyleSheet()
        self.story = []

    def add_logo_and_date(self, logo_text, date_text):
        # Define styles
        logo_style = ParagraphStyle(
            name="LogoStyle",
            fontName="Poppins-ExtraBold",
            fontSize=24,
            textColor=Color(0.145, 0.388, 0.922),  # RGB values for #2563eb
            alignment=0,  # Left alignment
            spaceAfter=10
        )

        date_style = ParagraphStyle(
            name="DateStyle",
            fontName="Poppins",
            fontSize=10,
            textColor=Color(0, 0, 0),
            alignment=2,  # Left alignment
            spaceAfter=20
        )

        # Add logo (right aligned) and date (below the logo, left aligned)
        self.story.append(Paragraph(logo_text, logo_style))
        self.story.append(Spacer(1, 10))
        self.story.append(Paragraph(date_text, date_style))

    def add_title(self):
        title_style = ParagraphStyle(
            name="TitleStyle",
            fontName="Poppins-Bold",
            fontSize=24,
            textColor=Color(0, 0, 0),
            alignment=1,  # Center alignment
            spaceAfter=62
        )
        self.story.append(Paragraph("Model Report", title_style))

    def add_overview(self, model_name, task, parameters):
        # Format parameters directly inline
        formatted_parameters = ", ".join([f"<b>{key}</b>: {value}" for key, value in parameters.items()])

        # Overview text
        overview_text = (
            f"This report presents the results of using the <b>{model_name}</b> model "
            f"for a <b>{task}</b> task. The model was configured with the following parameters: {formatted_parameters}. "
            "Below, you will find visualizations and explanations of the results."
        )
        overview_style = ParagraphStyle(
            name="OverviewStyle",
            fontName="Poppins",
            fontSize=12,
            textColor=Color(0, 0, 0),
            leading=18,  # Adjust line spacing
            alignment=0,  # Left alignment
            spaceAfter=32
        )
        self.story.append(Paragraph(overview_text, overview_style))

    def add_image(self, title, image_base64, description):
        # Add title
        title_style = ParagraphStyle(
            name="TitleStyle",
            fontName="Poppins-Bold",
            fontSize=12,
            textColor=Color(0, 0, 0),
            alignment=0,  # Left alignment
            spaceAfter=12
        )
        self.story.append(Paragraph(title, title_style))
        # Add description
        desc_style = ParagraphStyle(
            name="DescriptionStyle",
            fontName="Poppins",
            fontSize=12,
            textColor=Color(0.2, 0.2, 0.2),
            leading=16,  # Adjust line spacing
            alignment=0,  # Left alignment
            spaceAfter=24
        )
        self.story.append(Paragraph(description, desc_style))

        # Decode the base64 image and add it to the PDF
        image_data = base64.b64decode(image_base64)
        image_buffer = io.BytesIO(image_data)
        img = Image(image_buffer, width=450, height=300)  # Adjust dimensions as needed
        self.story.append(img)
        self.story.append(Spacer(1, 24))


    def generate_pdf(self, visualizations, model_name, task, parameters):
        # Add header with logo and date
        current_date = datetime.now().strftime("%B %d, %Y")
        self.add_logo_and_date("LOOR", current_date)

        # Add title and overview
        self.add_title()
        self.add_overview(model_name, task, parameters)

        # Add visualizations with descriptions
        for title, (image_base64, description) in visualizations.items():
            self.add_image(title, image_base64, description)

        # Build the PDF
        doc = SimpleDocTemplate(self.buffer, pagesize=letter, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
        doc.build(self.story)

        # Reset buffer pointer
        self.buffer.seek(0)
        return self.buffer







# from reportlab.lib.pagesizes import letter
# from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak
# from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
# from reportlab.lib.colors import Color
# from reportlab.pdfbase.ttfonts import TTFont
# from reportlab.pdfbase import pdfmetrics
# from datetime import datetime
# import io
# import base64

# # Register custom font (Poppins)
# pdfmetrics.registerFont(TTFont('Poppins', 'utils/fonts/Poppins-Regular.ttf'))
# pdfmetrics.registerFont(TTFont('Poppins-Bold', 'utils/fonts/Poppins-Bold.ttf'))
# pdfmetrics.registerFont(TTFont('Poppins-ExtraBold', 'utils/fonts/Poppins-ExtraBold.ttf'))


# class PDF:
#     def __init__(self):
#         self.buffer = io.BytesIO()
#         self.styles = getSampleStyleSheet()
#         self.story = []

#     def add_logo(self, text):
#         # Define a custom style for the logo
#         logo_style = ParagraphStyle(
#             name="LogoStyle",
#             fontName="Poppins-ExtraBold",
#             fontSize=48,
#             textColor=Color(0.145, 0.388, 0.922),  # RGB values for #2563eb
#             alignment=1,  # Center alignment
#             spaceAfter=70
#         )
#         # Add the logo as a paragraph
#         self.story.append(Paragraph(text, logo_style))

#     def add_title(self):
#         title_style = ParagraphStyle(
#                     name="TitleStyle",
#                     fontName="Poppins-Bold",
#                     fontSize=24,
#                     textColor=Color(0, 0, 0),
#                     alignment=1,  # Center alignment
#                     spaceAfter=70
#         )
#         self.story.append(Paragraph("Model Report", title_style))

#     def add_date(self):
#         date_style = ParagraphStyle(
#             name="DateStyle",
#             fontName="Poppins",
#             fontSize=12,
#             textColor=Color(0, 0, 0),
#             alignment=2,  # Right alignment
#             spaceAfter=80
#         )
#         current_date = datetime.now().strftime("%B %d, %Y")
#         self.story.append(Paragraph(f"{current_date}", date_style))

#     def add_overview(self, model_name, task, parameters):
#         # Format parameters
#         formatted_parameters = "<br/>".join([f"<b>{key}</b>: {value}" for key, value in parameters.items()])

#         # Overview text
#             # f"<b>Report Overview</b><br/><br/>"
#         overview_text = (
#             f"This report presents the results of using the <b>{model_name}</b> model "
#             f"for a <b>{task}</b> task. The model was configured with the following parameters:<br/>{formatted_parameters}. "
#             "Below, you will find visualizations and explanations of the results."
#         )
#         overview_style = ParagraphStyle(
#             name="OverviewStyle",
#             fontName="Poppins",
#             fontSize=10,
#             textColor=Color(0, 0, 0),
#             leading=18,  # Adjust line spacing
#             alignment=0,  # Left alignment
#             spaceAfter=20
#         )
#         self.story.append(Paragraph(overview_text, overview_style))

#     def add_image(self, title, image_base64, description):
#         # Add title
#         title_style = ParagraphStyle(
#             name="TitleStyle",
#             fontName="Poppins-Bold",
#             fontSize=16,
#             textColor=Color(0, 0, 0),
#             alignment=0,  # Left alignment
#             spaceAfter=20
#         )
#         self.story.append(Paragraph(title, title_style))

#         # Decode the base64 image and add it to the PDF
#         image_data = base64.b64decode(image_base64)
#         image_buffer = io.BytesIO(image_data)
#         img = Image(image_buffer, width=450, height=300,hAlign="LEFT")  # Adjust dimensions as needed
#         self.story.append(img)
#         self.story.append(Spacer(1, 14))

#         # Add description
#         desc_style = ParagraphStyle(
#             name="DescriptionStyle",
#             fontName="Poppins",
#             fontSize=12,
#             textColor=Color(0.2, 0.2, 0.2),
#             leading=16,  # Adjust line spacing
#             alignment=0,  # Left alignment
#             spaceAfter=50
#         )
#         self.story.append(Paragraph(description, desc_style))

#     def generate_pdf(self, visualizations, model_name, task, parameters):
#         # Add elements to the story
#         self.add_logo("LOOR")
#         self.add_date()

#         self.add_title()
#         self.add_overview(model_name, task, parameters)

#         # Add visualizations with descriptions
#         for title, (image_base64, description) in visualizations.items():
#             self.add_image(title, image_base64, description)

 

#         # Build the PDF
#         doc = SimpleDocTemplate(self.buffer, pagesize=letter, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
#         doc.build(self.story)

#         # Reset buffer pointer
#         self.buffer.seek(0)
#         return self.buffer






# from reportlab.lib.pagesizes import letter
# from reportlab.pdfgen import canvas
# from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
# from reportlab.lib.styles import getSampleStyleSheet
# import io
# import base64

# class PDF:
#     def __init__(self):
#         self.buffer = io.BytesIO()
#         self.styles = getSampleStyleSheet()
#         self.story = []

#     def add_image(self, title, image_base64):
#         # Add title
#         title_style = self.styles["Heading2"]
#         self.story.append(Paragraph(title, title_style))
#         self.story.append(Spacer(1, 12))

#         # Decode the base64 image and add it to the PDF
#         image_data = base64.b64decode(image_base64)
#         image_buffer = io.BytesIO(image_data)
#         img = Image(image_buffer, width=400, height=250)  # Adjust dimensions as needed
#         self.story.append(img)
#         self.story.append(Spacer(1, 24))

#     def generate_pdf(self, visualizations):
#         doc = SimpleDocTemplate(self.buffer, pagesize=letter)
#         for title, image_base64 in visualizations.items():
#             self.add_image(title, image_base64)
#         doc.build(self.story)

#         # Reset buffer pointer
#         self.buffer.seek(0)
#         return self.buffer

# Usage
# Example data
# visualizations = {
#     "Metrics Bar Chart": "base64_string_for_image1",
#     "ROC Curve": "base64_string_for_image2",
#     "Confusion Matrix": "base64_string_for_image3",
# }

# pdf = PDF()
# pdf_buffer = pdf.generate_pdf(visualizations)

# # Example: Convert buffer to base64 to send to the frontend
# pdf_base64 = base64.b64encode(pdf_buffer.read()).decode('utf-8')
# pdf_buffer.close()

# # Send `pdf_base64` to the frontend



# from fpdf import FPDF
# import io
# import base64

# class PDF(FPDF):
#     def __init__(self):
#         super().__init__()
#         self.set_auto_page_break(auto=True, margin=15)
#         self.add_page()
#         self.set_font("Arial", size=12)

#     def add_image(self, title, image_base64):
#         self.set_font("Arial", "B", 14)
#         self.cell(0, 10, title, ln=True, align="C")
#         self.ln(10)

#         # Decode the base64 image and add it to the PDF
#         image_data = base64.b64decode(image_base64)
#         image_buffer = io.BytesIO(image_data)
#         self.image(image_buffer, x=10, y=None, w=190)  # Adjust dimensions as needed
#         self.ln(20)

# # Function to generate a PDF with visualizations
# def generate_pdf(visualizations):
#     pdf = PDF()

#     for title, image_base64 in visualizations.items():
#         pdf.add_image(title, image_base64)

#     # Save to a buffer
#     pdf_buffer = io.BytesIO()
#     pdf.output(pdf_buffer)
#     pdf_buffer.seek(0)  # Reset buffer pointer

#     # Return the buffer
#     return pdf_buffer

# # Usage
# # visualizations = {
# #     "Metrics Bar Chart": "base64_string_for_image1",
# #     "ROC Curve": "base64_string_for_image2",
# #     "Confusion Matrix": "base64_string_for_image3",
# # }

# # pdf_buffer = generate_pdf(visualizations)

# # # Example: Convert buffer to base64 to send to the frontend
# # pdf_base64 = base64.b64encode(pdf_buffer.read()).decode('utf-8')
# # pdf_buffer.close()

# # # Send `pdf_base64` to the frontend

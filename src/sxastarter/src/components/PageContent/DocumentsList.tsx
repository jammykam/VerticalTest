import React from 'react';
import {
  Field,
  ImageField,
  Image,
  LinkField,
  Link,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import useVisibility from 'src/hooks/useVisibility';
import PdfViewerModal from '../PdfViewerModal';

interface ModalExampleProps {
  fileUrl: string;
}

interface Fields {
  Title1: Field<string>;
  Subtitle1: Field<string>;
  Image1: ImageField;
  Link1: LinkField;
  Subtitle2: Field<string>;
  Image2: ImageField;
  Link2: LinkField;
  Subtitle3: Field<string>;
  Image3: ImageField;
  Link3: LinkField;
  Subtitle4: Field<string>;
  Image4: ImageField;
  Link4: LinkField;
}

export type DocumentsListProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: DocumentsListProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext.pageEditing;

  const DocumentItem = ({
    image,
    subtitle,
    link,
    delay,
  }: {
    image: ImageField;
    subtitle: Field<string>;
    link: LinkField;
    delay?: number;
  }) => {
    const [isVisible, domRef] = useVisibility(delay);

    if (!link.value?.href) {
      return null; // Skip rendering if the link is invalid
    }

    return (
      <div
        className={`col  ${!isPageEditing ? `fade-section ${isVisible ? 'is-visible' : ''}` : ''}`}
        ref={domRef}
      >
        <div className="item">
          <Image field={image} />
          <div className="text-container">
            <Link field={link} />
            <span className="subtitle">
              <Text field={subtitle} /> |&nbsp;
              <PdfViewerModal fileUrl={link.value.href} linkLabel="View PDF" />
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`component component-spaced documents-list ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="title display-6">
          <Text field={props.fields?.Title1} />
        </div>
        <div className="documents-container">
          <div className="row row-cols-1 row-cols-xl-2 gx-4">
            <DocumentItem
              image={props.fields?.Image1}
              subtitle={props.fields?.Subtitle1}
              link={props.fields?.Link1}
              delay={0}
            />
            <DocumentItem
              image={props.fields?.Image2}
              subtitle={props.fields?.Subtitle2}
              link={props.fields?.Link2}
              delay={500}
            />
            <DocumentItem
              image={props.fields?.Image3}
              subtitle={props.fields?.Subtitle3}
              link={props.fields?.Link3}
              delay={1000}
            />
            <DocumentItem
              image={props.fields?.Image4}
              subtitle={props.fields?.Subtitle4}
              link={props.fields?.Link4}
              delay={1500}
            />
          </div>
          {/*
          <div>
            <PdfViewerModal fileUrl="https://www.capgemini.com/wp-content/uploads/2024/05/Everest_Group_-_Intelligent_Process_Automation__IPA__Solutions_PEAK_Matrix_Assessment_2024_-_Focus_on_Capgemini.pdf" linkLabel="View Document" />
            <PdfViewerModal fileUrl="https://example.com/anothersample.pdf" linkLabel="Open Another PDF" />
            <PdfViewer pdfUrl="https://www.capgemini.com/wp-content/uploads/2024/05/Everest_Group_-_Intelligent_Process_Automation__IPA__Solutions_PEAK_Matrix_Assessment_2024_-_Focus_on_Capgemini.pdf" />
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';

import EditBar from './EditBar';

import useFirestore from '../../hooks/useFirestore';
import { projectFirestore, projectStorage } from '../../firebase/config';
import asyncForEach from '../../logic/asyncForEach';

import testImgScr from '../../images/camera.svg';
import '../../styles/image-list.scss';

import ReactDragListView from 'react-drag-listview';

import firebase from 'firebase/app';

function ImageList({ page }) {
  const { data } = useFirestore(page);
  const [currentList, setCurrentList] = useState([]);
  const [dragMode, setDragMode] = useState(false);
  const [trash, setTrash] = useState([]);
  const [listBeforeDrag, setListBeforeDrag] = useState([]);

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const images = [...currentList];
      setListBeforeDrag([...currentList]);
      const item = images.splice(fromIndex, 1)[0];
      images.splice(toIndex, 0, item);
      setCurrentList(images);
    },
    nodeSelector: 'li',
    handleSelector: 'button.drag-btn',
  };

  function toggleDragMode() {
    document.querySelectorAll('.image-list-item').forEach((el) => {
      el.children[2].children[0].checked = false;
      el.classList.remove('selected');
    });
    setTrash([]);
    setDragMode((d) => !d);
  }

  async function handleSave() {
    projectFirestore
      .collection('root')
      .doc(page)
      .update({ images: [...currentList] })
      .then(() => {
        toggleDragMode();
      })
      .catch((err) => {
        console.log('Error saving new list order', err);
      });
  }

  function toggleTrash(item, idx) {
    const li = document.getElementById(`${page}-item-${idx}`);
    li.classList.toggle('selected');
    if (trash.includes(item)) {
      setTrash((t) => t.filter((e) => e !== item));
    } else {
      setTrash((t) => [...t, item]);
    }
  }

  function toggleAllTrash(event) {
    setTrash([]);
    if (event.target.checked === true) {
      currentList.forEach((item, idx) => {
        setTrash((t) => [...t, item]);
        const li = document.getElementById(`${page}-item-${idx}`);
        li.classList.add('selected');
        li.children[2].children[0].checked = true;
      });
    } else {
      currentList.forEach((item, idx) => {
        const li = document.getElementById(`${page}-item-${idx}`);
        li.classList.remove('selected');
        li.children[2].children[0].checked = false;
      });
    }
  }

  function undoDrag() {
    setCurrentList(listBeforeDrag);
  }

  async function deleteItems() {
    await asyncForEach(trash, (item) => {
      const itemsToDelete = [
        item.imgName,
        `thumb@64_${item.imgName}`,
        `thumb@512_${item.imgName}`,
      ];

      Promise.all(
        itemsToDelete.map((itemName) => projectStorage.ref(itemName).delete())
      )
        .then(() => {
          projectFirestore
            .collection('root')
            .doc(page)
            .update({
              images: firebase.firestore.FieldValue.arrayRemove(item),
            });
        })
        .catch((err) => {
          console.log(`Error while deleting ${item.name}: `, err);
          console.log(`Still deleting database entry for item`);
          projectFirestore
            .collection('root')
            .doc(page)
            .update({
              images: firebase.firestore.FieldValue.arrayRemove(item),
            });
        });
    });

    setTrash([]);
    document.querySelectorAll('.image-list-item').forEach((el) => {
      el.children[2].children[0].checked = false;
      el.classList.remove('selected');
    });
    document.getElementById('select-all').checked = false;
  }

  useEffect(() => {
    console.log('rendering', page);
    if (data) {
      setCurrentList(data.images);
      setListBeforeDrag(data.images);
    }
  }, [data]);

  return (
    <div className="image-list">
      <ReactDragListView {...dragProps}>
        <ol>
          {currentList &&
            currentList.map((item, idx) => (
              <li
                className="image-list-item"
                id={`${page}-item-${idx}`}
                key={idx}
              >
                <div className="img-container">
                  <img alt={'alt'} src={item['thumbUrl@64'] || testImgScr} />
                </div>
                <div className="img-name">{item.imgName}</div>
                <div className="action-container">
                  {dragMode ? (
                    <button className="drag-btn">
                      <i className="fas fa-arrows-alt"></i>
                    </button>
                  ) : (
                    <input
                      className="img-select"
                      type="checkbox"
                      onClick={() => toggleTrash(item, idx)}
                    />
                  )}
                </div>
              </li>
            ))}
        </ol>
      </ReactDragListView>
      <EditBar
        handleSave={handleSave}
        trashAmount={trash.length}
        toggleAllTrash={toggleAllTrash}
        toggleDragMode={toggleDragMode}
        dragMode={dragMode}
        deleteItems={deleteItems}
        undoDrag={undoDrag}
        page={page}
      />
    </div>
  );
}

export default ImageList;

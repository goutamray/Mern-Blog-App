import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from 'react-icons/hi';


const CommentSection = ({ postId }) => {
  const {currentUser } = useSelector((state) => state.user);
  const [comment, setComment ] = useState('')
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [commentToDelete, setCommentToDelete] = useState(null);

  const navigate = useNavigate(); 

  // handle Submit comment 
   const handleSubmit = async (e) => {
     e.preventDefault();
  
     if(comment.length > 200){
        return;
     }

     try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
   }


   // get all comments 
   useEffect(() => {
       const getComments = async () => {
          const res = await fetch(`/api/comment/getPostComments/${postId}`);
          const data = await res.json();
          if (res.ok) {
            setComments(data);
          }
       }
       getComments();
   }, [postId])


   // handle like 
   const handleLike = async(commentId)=> {
      try {
        if (!currentUser) {
          navigate("/sign-in");
          return;
        }

        const res = await fetch(`/api/comment/likeComment/${commentId}`, {
          method : "PATCH",
        })

        if (res.ok) {
           const data = await res.json();
           setComments(
            comments.map((comment) =>
              comment._id === commentId
                ? {
                    ...comment,
                    likes: data.likes,
                    numberOfLikes: data.likes.length,
                  }
                : comment
            )
          )
        }
      } catch (error) {
        console.log(error.message);
        
      }
   }

   // handle edit 
   const handleEdit = async(comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
   }


   // handle comment delete 
   const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className="max-w-3xl mx-auto w-full p-3 ">
      {
        currentUser ? (
          <div className="flex gap-1 items-center my-5 text-gray-500 ">
              <p> Sign In as : </p>
              <img src={currentUser?.photo} alt="" className="h-5 w-5 rounded-full object-cover border-1 "/>
              <Link to={`/dashboard?tab=profile`} className="text-sm text-cyan-600 hover:underline"> 
                @{currentUser?.name}
              </Link>
          </div>
        ) : (
           <div className="flex items-center text-sm text-teal-500 gap-1 ">
              <p> You must be Sign in to comment </p>
              <span> 
                <Link to="/sign-in" className="text-md font-semibold text-blue-600 hover:underline"> Sign In </Link>
              </span>
          </div>
        )
      }
       {currentUser && (
        <form
           onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'
        >
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
        </form>
      )}

      {
        comments?.length > 0 ? (
          <> 
          <div className="flex items-center my-5 gap-2 text-md ">
            <h2> Comments </h2>
            <div className="border border-gray-400 px-2 py-1 rounded-sm">
              <p> {comments?.length} </p>
            </div>
          </div>

         {
           comments?.map((item, index) => {
            return <Comment 
                      key={index} 
                      item={item} 
                      onLike={handleLike}
                      onEdit={handleEdit} 
                      onDelete={(commentId) => {
                        setShowModal(true); 
                        setCommentToDelete(commentId)
                      }}
                    />
           })
         }
          </>
        )
        : (
          <p className="text-md my-5"> No Comments Found</p>
        )
      }

     <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I am sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default CommentSection




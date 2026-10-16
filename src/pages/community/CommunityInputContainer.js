import React, { useEffect, useMemo, useState } from 'react';
import CommunityInputComponent from './CommunityInputComponent';
import CommunityInputResultComponent from './CommunityInputResultComponent';
import CommunityNoText from './CommunityNoText';
import S from './style';
import { useSelector } from 'react-redux';

const CommunityInputContainer = ({activeFilter}) => {
  const [post,setPost] = useState([])
  const [openPost, setOpenPost] = useState([])
  const [visibleCount, setVisibleCount] = useState(5);

  const currentUser = useSelector((state) => state.user.currentUser);
  const myId = currentUser?.user_id;

  const [friendIds, setFriendIds] = useState([]);

  const togglePost = async (postId) => {
    setOpenPost(p =>
      p.includes(postId) ? p.filter(id => id !== postId) : [...p, postId]
    );

    const target = post.find(p => p.id === postId);
    if(!target || (target.commentList && target.commentList.length > 0)) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/community/api/get-replies/${postId}`);
      if(!res.ok) throw new Error('댓글 불러오기 실패');
      const json = await res.json();

      const toItem = (r) => ({
        id: r.reply_id,
        text: r.reply_content,
        createdAt: r.created_at,
        authorId: r.user_id,
        authorName: r.authorName,
        authorProfileImage: r.authorProfileImage || '/assets/img/sample-profile.png'
      });

      const all = json?.data || [];
      // 일반 댓글(parent_reply_id 없음) 아래에 대댓글을 묶어서 화면 구조에 맞춤
      const mappedReplies = all
        .filter(r => !r.parent_reply_id)
        .map(r => ({
          ...toItem(r),
          replies: all.filter(c => c.parent_reply_id === r.reply_id).map(toItem),
        }));

      setPost(prev => prev.map(p =>
        p.id === postId ? {...p, commentList: mappedReplies} : p
      ));
    }catch (e) {
      console.error(e);
    }
  }

  const handleLike = (postId) => {
    setPost(prev => prev.map(post => post.id === postId ? 
      {...post, 
        likeCount: post.liked? post.likeCount - 1 : post.likeCount + 1,
        liked: !post.liked
      } : post))
  }

  const handleComment = (postId, newComment) => {
    if(newComment.trim() === "") return;

    const commentObject = {
      id : Date.now(),
      text: newComment,
      createdAt : new Date().toISOString(),
      replies : []
    }

    setPost(prev => prev.map(post => post.id === postId ?
      {...post, commentList: [...post.commentList, commentObject]}
      : post
    ))
  }
  const [commentInput, setCommentInput] = useState({})

  const [countComment,setCountComment] = useState('')

  // 게시글 삭제
  const deletePost = (postId) => {
    setPost(prev => prev.filter(post => post.id !== postId))
  }

  const deleteComment = (postId, commentId) => {
    setPost(prev => prev.map(post => post.id === postId ? 
      {
        ...post,
        commentList: post.commentList.filter(comment => comment.id !== commentId)
      } : post
    ))
  }

  // 대댓글
  const [replyInput, setReplyInput] = useState({})
  const [openReplyInput, setOpenReplyInput] = useState({});
  const toggleReplyInput = (commentId) => {
    setOpenReplyInput(prev => ({
      ...prev,
      [commentId] : !prev[commentId]
    }))
  }

  const addReply = async (postId, commentId, replyText) => {
    const text = (replyText || '').trim();
    if (text === "") return;

    try {
      const token = localStorage.getItem('jwt_token');
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/community/api/register-reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ post_id: postId, reply_content: text, parent_reply_id: commentId }),
      });
      if (!res.ok) throw new Error(`대댓글 등록 실패: ${res.status}`);
      const { reply } = await res.json();

      const replyObject = {
        id: reply.reply_id,
        text: reply.reply_content,
        createdAt: reply.created_at,
        authorId: reply.user_id,
        authorName: reply.authorName,
        authorProfileImage: reply.authorProfileImage || '/assets/img/sample-profile.png',
      };

      setPost(prev => prev.map(post => {
        if (post.id !== postId) return post;
        return {
          ...post,
          commentList: post.commentList.map(comment =>
            comment.id === commentId
              ? { ...comment, replies: [...(comment.replies || []), replyObject] }
              : comment
          ),
        };
      }));
    } catch (e) {
      console.error(e);
      alert('대댓글 등록 중 오류가 발생했어요');
    }
  }
  
  const deleteReply = async (postId, commentId, replyId) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/community/api/remove-reply/${replyId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`대댓글 삭제 실패: ${res.status}`);
    } catch (e) {
      console.error(e);
      alert('대댓글 삭제 중 오류가 발생했어요');
      return;
    }

    setPost(prev => prev.map(post => {
      if (post.id !== postId) return post;
      return {
        ...post,
        commentList: post.commentList.map(comment => {
          if (comment.id !== commentId) return comment;
          return {
            ...comment,
            replies: comment.replies.filter(reply => reply.id !== replyId)
          }
        })
      }
    }))
  }

  //필터
  const filteredPost = useMemo(() => {
    let arr = [...post];

    switch (activeFilter){
      case "최신순":
        arr.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      
      case "인기순":
        arr.sort((a,b) => (b.likeCount || 0) - (a.likeCount || 0));
        break;

      case "내가 쓴 게시글": //로그인 유저 id 생긴 후 구현
        if(myId) {
          arr = arr.filter((p) => p.authorId === myId);
        } else {
          arr = [];
        }
        break;
        

      case "내 친구가 쓴 게시글": //로그인 후 구현
        if (friendIds.length > 0) {
          arr = arr.filter((p) => friendIds.includes(p.authorId));
        } else {
          arr = [];
        }
        break;
      
      default:
        break;
    }
    return arr;
  }, [post, activeFilter, myId, friendIds]);

  useEffect(() => {
    setVisibleCount(5);
  }, [activeFilter, post.length]);

  const displayedPosts = useMemo(
    () => filteredPost.slice(0, visibleCount),
    [filteredPost,visibleCount]
  );

  //새로고침 시 글 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/community/api/get-posts`);
        if (!res.ok) throw new Error('게시글 불러오기 실패');
        const json = await res.json();

        const mapped = (json?.data || []).map(p =>({
          id: p.post_id,
          title: p.title,
          content: p.content,
          createdAt: p.created_at,
          likeCount: p.like_count ?? 0,
          commentCount: p.comment_count ?? 0,
          liked: false,
          commentList: [],
          authorName: p.authorName,
          authorProfileImage: p.authorProfileImage || '/assets/img/sample-profile.png',
          authorId: p.user_id,
        }));

        setPost(mapped);

      } catch(e){
        console.error(e);
        alert('게시글 목록을 불러오지 못했습니다');
      }
    };
    fetchPosts();
  },[]);

  
 
  return (
    <div>
      <CommunityInputComponent post={post} setPost={setPost}
      countComment={countComment} setCountComment={setCountComment}
        />
      {displayedPosts.length > 0 ? 
      <CommunityInputResultComponent post={displayedPosts} setPost={setPost} openPost={openPost} togglePost={togglePost} handleLike={handleLike}
      handleComment={handleComment} setCommentInput={setCommentInput} commentInput={commentInput}
      countComment={countComment} setCountComment={setCountComment} deletePost={deletePost} 
      deleteComment={deleteComment} openReplyInput={openReplyInput} toggleReplyInput={toggleReplyInput}
      replyInput={replyInput} setReplyInput={setReplyInput} addReply={addReply} setOpenReplyInput={setOpenReplyInput}
      deleteReply={deleteReply}
      /> : <CommunityNoText/>}

      {filteredPost.length > displayedPosts.length && (
        <S.MoreTextButtonWrapper>
          <S.MoreTextButton
            roundButton="medium"  variant="filled" onClick={() => setVisibleCount((c) => c+5)}
          >
            더보기
          </S.MoreTextButton>
        </S.MoreTextButtonWrapper>
      )}
    </div>
  );
};

export default CommunityInputContainer;
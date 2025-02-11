import { useForm } from 'react-hook-form';
import { TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const AddVolunteerPost = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useContext(AuthContext);

    const onSubmit = async (data) => {
        console.log(data);
        data.user_id = user.uid;

        try {
            const response = await axios.post('https://assignment-11-server-woad-one.vercel.app/api/add_volunteer_post', data, { withCredentials: true });
            if (response.status === 201) {
                toast.success('Volunteer post added successfully');
                console.log(response.data);
                // Reset form after successful submission
                reset();
            } else {
                toast.error('Failed to add volunteer post');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to add volunteer post');
        }
    };

    return (
        <div>
            <Helmet>
                <title>VolunteerHub | Add Volunteer Post</title>
            </Helmet>
            <div className='mb-8'>
                <h2 className="font_playfair text-center text-[#131313] font-bold text-4xl">Add Volunteer Post</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-6 mx-72 my-8'>
                    <Grid item xs={12}>
                        <TextField
                            {...register('thumbnail', { required: 'Thumbnail is required' })}
                            label="Thumbnail"
                            fullWidth
                            error={!!errors.thumbnail}
                            helperText={errors.thumbnail ? errors.thumbnail.message : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register('postTitle', { required: 'Post Title is required' })}
                            label="Post Title"
                            fullWidth
                            error={!!errors.postTitle}
                            helperText={errors.postTitle ? errors.postTitle.message : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register('description', { required: 'Description is required' })}
                            label="Description"
                            multiline
                            rows={4}
                            fullWidth
                            error={!!errors.description}
                            helperText={errors.description ? errors.description.message : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!errors.category}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                {...register('category', { required: 'Category is required' })}
                            >
                                <MenuItem value="healthcare">Healthcare</MenuItem>
                                <MenuItem value="education">Education</MenuItem>
                                <MenuItem value="socialService">Social Service</MenuItem>
                                <MenuItem value="animalWelfare">Animal Welfare</MenuItem>
                            </Select>
                            {errors.category && <Typography variant="caption" color="error">{errors.category.message}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register('location')}
                            label="Location"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register('volunteersNeeded', { required: 'No. of Volunteers Needed is required' })}
                            label="No. of Volunteers Needed"
                            fullWidth
                            type="number"
                            error={!!errors.volunteersNeeded}
                            helperText={errors.volunteersNeeded ? errors.volunteersNeeded.message : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register('deadline', { required: 'Deadline is required' })}
                            label="Deadline"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!errors.deadline}
                            helperText={errors.deadline ? errors.deadline.message : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register('organizerName', { required: 'Organizer Name is required' })}
                            label="Organizer Name"
                            fullWidth
                            defaultValue={ user.displayName ? user.displayName : "John Doe" }
                            InputProps={{
                                readOnly: true,
                            }}
                            error={!!errors.organizerName}
                            helperText={errors.organizerName ? errors.organizerName.message : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register('organizerEmail', { required: 'Organizer Email is required' })}
                            label="Organizer Email"
                            fullWidth
                            defaultValue={ user.email ? user.email : "john@example.com" }
                            InputProps={{
                                readOnly: true,
                            }}
                            error={!!errors.organizerEmail}
                            helperText={errors.organizerEmail ? errors.organizerEmail.message : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <button className="bg-[#dda15e] w-1/2 h-full hover:bg-[#bc6c25] text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">Add Post</button>
                    </Grid>
                </div>
            </form>
        </div>
    );
};

export default AddVolunteerPost;

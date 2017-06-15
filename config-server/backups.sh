#!/bin/bash
####################################
#
# Variables.
#
####################################

# What to backup.
backup_files="/var/www/html"

# Local backup files folder
dest="/home/travelaer/backups/files"

# Backup Folder
backup_folder="/home/travelaer/backups/"

# Create archive filename.
day=$(date +%m%d%y)
hostname=$(hostname -s)
archive_file="$hostname-$day.tgz"

####################################
#
# Backup Locally.
#
####################################

echo "Backing up $backup_files to $dest/$archive_file..."
tar czpf $dest/$archive_file $backup_files
echo "Local backup finished on $(date)"
echo
echo "Deleting backups older than 7 days..."
find /home/travelaer/backups/files* -mtime +7 -exec rm {} \;
echo "Finished deleting old backups on $(date)"
echo
ls -lh $dest
echo
echo "** Local Backup Complete.**"

####################################
#
# Backup Remotely.
#
####################################
echo
echo "Syncing with AWS..."
aws s3 sync $backup_folder s3://travelaer-backup-website --delete --only-show-errors
echo "Remote backup finished on $(date) "
echo
echo "** Backup complete. **"
